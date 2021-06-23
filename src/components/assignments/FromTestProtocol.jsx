import React, { Fragment } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const FromTestProtocol = ({ onHide, assignmentNumber }) => {
  return (
    <Fragment>
      <Form>
        <Row>
          <Form.Label column>Seriennummer der Leiterkart</Form.Label>
          <Col>
            <Form.Control type='text' name='serialNumber' id='serialNumber' />
          </Col>
        </Row>
        <Row className='mb-2'>
          <Form.Label column>Prüfer</Form.Label>
          <Col>
            <Form.Control type='number' name='tester' id='tester' />
          </Col>
        </Row>
        <hr />
        <Row>
          <Col>
            <p>Display ansteuern, Leuchten alle Segmente?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='activeDisplay'
              id='activeDisplayOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='activeDisplay'
              id='activeDisplayNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Leuchtet die LED?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='lightsUpLED'
              id='lightsUpLEDOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='lightsUpLED'
              id='lightsUpLEDNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Alarmsequenz komplett zu hören?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='alarmSequence'
              id='alarmSequenceOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='alarmSequence'
              id='alarmSequenceNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Spannungswert? (Sollwert 12V +- 0,5V)</p>
          </Col>
          <Col>
            <Form.Control type='number' name='voltageValue' id='voltageValue' />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>gemessene Temperatur? (Sollwert Raumtemperatur)</p>
          </Col>
          <Col>
            <Form.Control type='number' name='temperature' id='temperature' />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Funktion der Tasten?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='functionKeyboard'
              id='functionKeyboardOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='functionKeyboard'
              id='functionKeyboardNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Welle drehen, Drehzahl wird angezeigt?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='rotateShaft'
              id='rotateShaftOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='rotateShaft'
              id='rotateShaftNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Hallsensoren werden gemessen</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='hallSensors'
              id='hallSensorsOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='hallSensors'
              id='hallSensorsNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Funktionieren die einzelnen Phasen?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='individualPhases'
              id='individualPhasesOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='individualPhases'
              id='individualPhasesNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Kommutierung einschalten</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='switchCommutation'
              id='switchCommutationOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='switchCommutation'
              id='switchCommutationNG'
              value='0'
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <p>Drehzahl erhöhen, reagiert der Motor?</p>
          </Col>
          <Col>
            <Form.Check
              inline
              type='radio'
              label='OK'
              name='increaseSpeedEngine'
              id='increaseSpeedEngineOK'
              value='1'
            />
            <Form.Check
              inline
              type='radio'
              label='NG'
              name='increaseSpeedEngine'
              id='increaseSpeedEngineNG'
              value='0'
            />
          </Col>
        </Row>
      </Form>
    </Fragment>
  );
};

export default FromTestProtocol;
