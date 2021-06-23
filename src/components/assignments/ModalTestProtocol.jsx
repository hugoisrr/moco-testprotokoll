import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import FromTestProtocol from './FromTestProtocol';

const ModalTestProtocol = (props) => {
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Testprotokoll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FromTestProtocol
          onHide={props.onHide}
          assignmentNumber={props.assignmentNumber}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide} variant='outline-danger'>
          Schließen
        </Button>
        <Button variant='outline-primary'>Einreichen</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTestProtocol;
