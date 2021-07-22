import React, { useState, Fragment, useContext } from 'react';
import { Button, Form, Alert } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const AssignmentForm = () => {
  const assignmentContext = useContext(AssignmentContext);
  const [show, setShow] = useState(true);
  const [assignment, setAssignment] = useState({
    number: '',
  });

  const [validated, setValidated] = useState(false);

  const { number } = assignment;

  const onChange = (e) =>
    setAssignment({ ...assignment, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    const form = e.currentTarget;
    if (form.checkValidity()) {
      e.preventDefault();
      setValidated(false);
      assignmentContext.addAssignment(assignment);
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
      {/* <Alert variant='danger' onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again. Duis mollis, est non commodo
          luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit.
          Cras mattis consectetur purus sit amet fermentum.
        </p>
      </Alert> */}
      <Form
        noValidate
        validated={validated}
        id='assignmentForm'
        onSubmit={onSubmit}
      >
        <Form.Group>
          <Form.Label>Nummber</Form.Label>
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
            Bitte geben Sie eine gültige Nummber ein.
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
