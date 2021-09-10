import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const ModalTester = ({ onHide, show, setNewModal, setTester, tester }) => {
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    setNewModal(false);
  }, [setNewModal]);

  useEffect(() => {
    setTester(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onCancel = () => {
    setNewModal(false);
    onHide();
  };

  const onChange = (e) => setTester(e.target.value);

  const onSubmit = (e) => {
    const form = e.target.form;
    if (form.checkValidity()) {
      e.preventDefault();
      setValidated(false);
      // TODO send tester Id to ModalTestProtocol
      setTester(null);
      onHide();
    } else {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <Modal
      onHide={onCancel}
      show={show}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>Prüfer</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} id='testerForm'>
          <Row className='mb-2'>
            <Form.Label column>Prüfer Id</Form.Label>
            <Col>
              <Form.Control
                required
                type='number'
                name='tester'
                id='tester'
                min='99'
                max='900'
                value={tester}
                onChange={onChange}
              />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Bitte geben Sie Ihre Mitarbeiternummer ein.
              </Form.Control.Feedback>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onCancel} variant='outline-danger'>
          Schließen
        </Button>
        <Button
          variant='outline-primary'
          type='button'
          onClick={onSubmit}
          form='testerForm'
        >
          Einreichen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTester;
