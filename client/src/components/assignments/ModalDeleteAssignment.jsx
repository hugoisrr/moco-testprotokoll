import React, { useContext } from 'react';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const ModalDeleteAssignment = ({
  onHide,
  show,
  assignmentId,
  assignmentNumber,
}) => {
  const assignmentContext = useContext(AssignmentContext);
  const { deleteAssignment } = assignmentContext;

  const onSubmit = (e) => {
    e.preventDefault();
    deleteAssignment(assignmentId);
    onHide();
  };

  return (
    <Modal
      onHide={onHide}
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Bestätigung zum Löschen: <b>" Auftrag - {assignmentNumber}"</b>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant='warning'>
          <Alert.Heading>Warnung!</Alert.Heading>
          <p>
            Durch das Löschen des Auftrags löschen Sie auch den durchgeführten
            Leiterplattentest.
          </p>
          <hr />
          <p className='mb-0'>
            Bitte bestätigen Sie, dass Sie den Auftrag löschen möchten.
          </p>
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Schließen
        </Button>
        <Form onSubmit={onSubmit}>
          <Button type='submit' variant='outline-primary'>
            Bestätigen
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteAssignment;
