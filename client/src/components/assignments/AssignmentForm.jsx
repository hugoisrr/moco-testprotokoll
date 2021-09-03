import React, { useState, Fragment, useContext, useEffect } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const AssignmentForm = () => {
  const assignmentContext = useContext(AssignmentContext);
  const { error, addAssignment, clearError } = assignmentContext;
  const [show, setShow] = useState(false);
  const [assignment, setAssignment] = useState({
    number: '',
  });

  const [validated, setValidated] = useState(false);

  const { number } = assignment;

  useEffect(() => {
    error !== null ? setShow(true) : setShow(false);
  }, [error]);

  const onChange = (e) =>
    setAssignment({ ...assignment, [e.target.name]: e.target.value });

  const closeErrorMessage = () => {
    clearError();
    setShow(false);
  };

  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      e.preventDefault();
      setValidated(false);
      clearError();
      addAssignment(assignment);
      setAssignment({
        number: '',
      });
    } else {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <Fragment>
      {show === true && (
        <Alert variant='danger' onClose={closeErrorMessage} dismissible>
          <Alert.Heading>Ops, es liegt ein Fehler vor!</Alert.Heading>
          <p>
            Der Server hat folgenden Fehler ausgegeben: <strong>{error}</strong>
          </p>
        </Alert>
      )}
      <Form
        noValidate
        validated={validated}
        id='assignmentForm'
        onSubmit={onSubmit}
      >
        <Form.Group>
          <Form.Label>Nummmer</Form.Label>
          <Form.Control
            required
            autoFocus
            type='text'
            name='number'
            id='assignmentNumber'
            value={number}
            minLength='5'
            onChange={onChange}
          ></Form.Control>
          <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
          <Form.Control.Feedback type='invalid'>
            Bitte geben Sie eine gültige Nummmer ein.
          </Form.Control.Feedback>
        </Form.Group>
        <Button variant='outline-primary' type='submit' className='mt-2'>
          Einreichen
        </Button>
      </Form>
    </Fragment>
  );
};

export default AssignmentForm;
