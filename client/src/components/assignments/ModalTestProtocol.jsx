import React, { useState, useContext, useEffect, useRef } from 'react';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
import AssignmentContext from '../../context/assignments/assignmentContext';

const ModalTestProtocol = ({ onHide, show, assignmentId, setNewModal }) => {
  const assignmentContext = useContext(AssignmentContext);
  const { addTestedBoardToAssignment, tester, setTester, clearTester } =
    assignmentContext;
  const testProtocol = {
    activeDisplay: null,
    lightsUpLED: null,
    alarmSequence: null,
    voltageValue: null,
    temperature: null,
    functionKeyboard: null,
    rotateShaft: null,
    hallSensors: null,
    individualPhases: null,
    switchCommutation: null,
    increaseSpeedEngine: null,
  };
  const [testBoard, setTestBoard] = useState({
    serialNumber: '',
    ...testProtocol,
  });
  const serialNumberRef = useRef(null);
  const testerRef = useRef(null);

  const [validated, setValidated] = useState(false);

  const { serialNumber, voltageValue, temperature } = testBoard;

  useEffect(() => {
    setNewModal(false);
  }, [setNewModal]);

  const onSubmit = (e) => {
    const form = e.target.form;
    if (form.checkValidity()) {
      e.preventDefault();
      setValidated(false);
      /* Board Test with valid data is sent */
      addTestedBoardToAssignment({
        ...testBoard,
        tester,
        assignmentId,
      });
      /* Form fields are set to empty or null */
      setTestBoard({
        serialNumber: '',
        ...testProtocol,
      });
      onHide();
      setNewModal(true);
    } else {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true);
    }
  };

  const onCancel = () => {
    clearTester();
    setNewModal(false);
    onHide();
  };

  const serialNumberDown = (e) => {
    if (e.key === 'Enter') {
      testerRef.current.focus();
    }
  };

  const onChange = (e) => {
    if (e.target.name === 'tester') {
      setTester(e.target.value);
      setTestBoard({
        ...testBoard,
        [e.target.name]: e.target.value,
      });
    }
    setTestBoard({
      ...testBoard,
      [e.target.name]: e.target.value,
    });
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
        <Modal.Title id='contained-modal-title-vcenter'>
          Testprotokoll
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate validated={validated} id='testProtocolForm'>
          <Row>
            <Form.Label column>Seriennummer der Leiterkarte</Form.Label>
            <Col>
              <Form.Control
                required
                autoFocus
                type='text'
                name='serialNumber'
                id='serialNumber'
                minLength='5'
                value={serialNumber}
                ref={serialNumberRef}
                onKeyDown={serialNumberDown}
                onChange={onChange}
              />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Bitte geben Sie eine gültige Seriennummer ein.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Form.Label column>Prüfer</Form.Label>
            <Col>
              <Form.Control
                required
                type='number'
                name='tester'
                id='tester'
                min='99'
                max='990'
                value={tester}
                ref={testerRef}
                onChange={onChange}
              />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Bitte geben Sie Ihre Mitarbeiternummer ein.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <hr />
          <Row>
            <Col>
              <p>Display ansteuern, Leuchten alle Segmente?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='activeDisplay'
                id='activeDisplayOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='activeDisplay'
                id='activeDisplayNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Leuchtet die LED?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='lightsUpLED'
                id='lightsUpLEDOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='lightsUpLED'
                id='lightsUpLEDNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Alarmsequenz komplett zu hören?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='alarmSequence'
                id='alarmSequenceOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='alarmSequence'
                id='alarmSequenceNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Form.Label column>
              Spannungswert? (Sollwert 12V +- 0,5V)
            </Form.Label>
            <Col>
              <Form.Control
                required
                type='number'
                name='voltageValue'
                id='voltageValue'
                min='100'
                max='13000'
                value={voltageValue}
                onChange={onChange}
              />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Bitte geben Sie einen gültigen Wert ein.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Form.Label column>
              gemessene Temperatur? (Sollwert Raumtemperatur)
            </Form.Label>
            <Col>
              <Form.Control
                required
                type='number'
                name='temperature'
                id='temperature'
                min='1'
                max='45'
                value={temperature}
                onChange={onChange}
              />
              <Form.Control.Feedback>Sieht gut aus!</Form.Control.Feedback>
              <Form.Control.Feedback type='invalid'>
                Bitte geben Sie einen gültigen Wert ein.
              </Form.Control.Feedback>
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Funktion der Tasten?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='functionKeyboard'
                id='functionKeyboardOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='functionKeyboard'
                id='functionKeyboardNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Welle drehen, Drehzahl wird angezeigt?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='rotateShaft'
                id='rotateShaftOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='rotateShaft'
                id='rotateShaftNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Hallsensoren werden gemessen</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='hallSensors'
                id='hallSensorsOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='hallSensors'
                id='hallSensorsNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Funktionieren die einzelnen Phasen?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='individualPhases'
                id='individualPhasesOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='individualPhases'
                id='individualPhasesNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Kommutierung einschalten</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='switchCommutation'
                id='switchCommutationOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='switchCommutation'
                id='switchCommutationNG'
                value='0'
                onChange={onChange}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <p>Drehzahl erhöhen, reagiert der Motor?</p>
            </Col>
            <Col>
              <Form.Check
                required
                inline
                type='radio'
                label='OK'
                name='increaseSpeedEngine'
                id='increaseSpeedEngineOK'
                value='1'
                onChange={onChange}
              />
              <Form.Check
                inline
                type='radio'
                label='NG'
                name='increaseSpeedEngine'
                id='increaseSpeedEngineNG'
                value='0'
                onChange={onChange}
              />
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
          form='testProtocolForm'
        >
          Einreichen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalTestProtocol;
