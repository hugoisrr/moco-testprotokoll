import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const Einstellungen = () => {
  const assignmentContext = useContext(AssignmentContext);
  const {
    fileStoragePath,
    getFileStoragePath,
    setNewStoragePath,
    clearError,
    error,
  } = assignmentContext;
  const [validated, setValidated] = useState(false);
  const [disable, setDisable] = useState(true);
  const [filesLocation, setFilesLocation] = useState('');
  const [showError, setShowError] = useState(false);
  const filesLocationInputRef = useRef(null);
  const checkBoxRef = useRef(null);

  // On file load of the component, it clears the error value
  useEffect(() => {
    error !== null ? setShowError(true) : setShowError(false);
  }, [error]);

  // before the component get loaded gets the file path from the server
  useEffect(() => {
    getFileStoragePath();
    setFilesLocation(fileStoragePath);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileStoragePath]);

  const onModify = () => {
    if (disable) {
      setDisable(false);
      filesLocationInputRef.current.focus();
    } else {
      setDisable(true);
    }
  };

  const closeErrorMessage = () => {
    clearError();
    setShowError(false);
  };

  const onChange = (e) => {
    if (e.target.name === 'filesLocationAddress') {
      setFilesLocation(e.target.value);
    }
  };

  const onSubmit = (e) => {
    clearError();
    const form = e.target.form;
    if (form.checkValidity()) {
      e.preventDefault();
      setValidated(false);
      // Modify location on Server
      setNewStoragePath(filesLocation);
      setDisable(true);
      checkBoxRef.current.checked = false;
    } else {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <div>
      <h1>Einstellungen</h1>
      {showError === true && (
        <Alert variant='danger' onClose={closeErrorMessage} dismissible>
          <Alert.Heading>Ops, es liegt ein Fehler vor!</Alert.Heading>
          <p>
            Der Server hat folgenden Fehler ausgegeben: <strong>{error}</strong>
          </p>
        </Alert>
      )}
      <Form id='storageAddress' noValidate validated={validated}>
        <Form.Group>
          <Form.Label>Dateispeicherort</Form.Label>
          <Form.Control
            id='filesLocationAddress'
            name='filesLocationAddress'
            minLength='3'
            required
            onChange={onChange}
            size='lg'
            type='text'
            ref={filesLocationInputRef}
            value={filesLocation}
            readOnly={disable}
          ></Form.Control>
          <Form.Control.Feedback type='invalid'>
            Bitte geben Sie eine gültige Adresse für den Dateispeicherort ein.
          </Form.Control.Feedback>
          <Form.Check
            type='checkbox'
            id='modifyAddress'
            name='modifyAddress'
            onChange={onModify}
            ref={checkBoxRef}
            label='Dateispeicherort ändern'
          ></Form.Check>
        </Form.Group>
      </Form>
      <Button
        variant='outline-primary'
        type='button'
        onClick={onSubmit}
        form='storageAddress'
        disabled={disable}
      >
        Ändern
      </Button>
    </div>
  );
};

export default Einstellungen;
