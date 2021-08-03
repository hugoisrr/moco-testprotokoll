import React, { useState, useRef, useContext, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const Einstellungen = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { fileStoragePath, getFileStoragePath } = assignmentContext;
  const [validated, setValidated] = useState(false);
  const [disable, setDisable] = useState(true);
  const [filesLocation, setFilesLocation] = useState('');
  const filesLocationInputRef = useRef(null);

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

  const onChange = (e) => {
    if (e.target.name === 'filesLocationAddress') {
      setFilesLocation(e.target.value);
    }
  };

  const onSubmit = (e) => {
    const form = e.target.form;
    if (form.checkValidity()) {
      e.preventDefault();
      setValidated(false);
      // Modify location on Server
    } else {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <div>
      <h1>Einstellungen</h1>
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
