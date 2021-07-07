import React, { useContext } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import AssignmentContext from './../../context/assignments/assignmentContext';

const ModalDeleteAssignment = () => {
  const assignmentContext = useContext(AssignmentContext);
  return (
    <Modal
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Bestätigung zum Löschen eine Auftrag
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Bitte bestätigen Sie, dass Sie der Auftrag löschen möchten.</h5>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger'>Schließen</Button>
        <Form noValidate id='deleteAssignmentForm'>
          <Button type='submit' variant='outline-primary'>
            Bestätig
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteAssignment;
