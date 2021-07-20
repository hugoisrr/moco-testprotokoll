import React, { useContext } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const ModalDeleteAssignment = ({ onHide, show, assignmentId }) => {
  const assignmentContext = useContext(AssignmentContext);
  const { deleteAssignment, getAssignmentSelected } = assignmentContext;

  const onSubmit = (e) => {
    e.preventDefault();
    deleteAssignment(assignmentId);
    onHide();
  };

  const assignment = getAssignmentSelected(assignmentId);
  // console.log({ assignment });

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
          Bestätigung zum Löschen eine Auftrag {assignment.number}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Bitte bestätigen Sie, dass Sie der Auftrag löschen möchten.</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant='outline-danger' onClick={onHide}>
          Schließen
        </Button>
        <Form onSubmit={onSubmit}>
          <Button type='submit' variant='outline-primary'>
            Bestätig
          </Button>
        </Form>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalDeleteAssignment;
