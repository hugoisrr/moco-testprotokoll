import { ListGroup } from 'react-bootstrap';
import {
  rowColorVariant,
  rowIcon,
  dateFormatter,
  testResultFormatter,
  validateVoltage,
  validateTemperature,
} from '../../helper/validationsBoardTests';

export const tableTestProtocols = {
  renderer: (row) => (
    <div>
      {row.testProtocols.map((testProtocol, index) => (
        <div key={index}>
          <ListGroup horizontal>
            <ListGroup.Item variant={`${rowColorVariant(testProtocol.result)}`}>
              <strong>Result: </strong>
              {testResultFormatter(testProtocol.result)}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Tester: </strong>
              {testProtocol.tester}
            </ListGroup.Item>
            <ListGroup.Item>
              <strong>Datum: </strong> {dateFormatter(testProtocol.createdAt)}
            </ListGroup.Item>
          </ListGroup>
          <ListGroup variant='flush'>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.activeDisplay)}`}
            >
              Display ansteuern, Leuchten alle Segmente?{' - '}
              <i className={`${rowIcon(testProtocol.test.activeDisplay)}`}></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.lightsUpLED)}`}
            >
              Leuchtet die LED{' - '}
              <i className={`${rowIcon(testProtocol.test.lightsUpLED)}`}></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.alarmSequence)}`}
            >
              Alarmsequenz komplett zu hören?{' - '}
              <i className={`${rowIcon(testProtocol.test.alarmSequence)}`}></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${validateVoltage(testProtocol.test.voltageValue)}`}
            >
              Spannungswert? (Sollwert 12V +- 0,5V){' - Wert: '}
              <strong>{`${testProtocol.test.voltageValue}`} mV</strong>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${validateTemperature(testProtocol.test.temperature)}`}
            >
              gemessene Temperatur? (Sollwert Raumtemperatur){' - Wert: '}
              <strong>{`${testProtocol.test.temperature}`} °C</strong>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.functionKeyboard)}`}
            >
              Funktion der Tasten?{' - '}
              <i
                className={`${rowIcon(testProtocol.test.functionKeyboard)}`}
              ></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.rotateShaft)}`}
            >
              Welle drehen, Drehzahl wird angezeigt?{' - '}
              <i className={`${rowIcon(testProtocol.test.rotateShaft)}`}></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.hallSensors)}`}
            >
              Hallsensoren werden gemessen{' - '}
              <i className={`${rowIcon(testProtocol.test.hallSensors)}`}></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(testProtocol.test.individualPhases)}`}
            >
              Funktionieren die einzeinen Phasen?{' - '}
              <i
                className={`${rowIcon(testProtocol.test.individualPhases)}`}
              ></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(
                testProtocol.test.switchCommutation
              )}`}
            >
              Kommutierung einschalten{' - '}
              <i
                className={`${rowIcon(testProtocol.test.switchCommutation)}`}
              ></i>
            </ListGroup.Item>
            <ListGroup.Item
              variant={`${rowColorVariant(
                testProtocol.test.increaseSpeedEngine
              )}`}
            >
              Drehzahl erhöhen, reagiert der Motor?{' - '}
              <i
                className={`${rowIcon(testProtocol.test.increaseSpeedEngine)}`}
              ></i>
            </ListGroup.Item>
          </ListGroup>
          <hr />
        </div>
      ))}
    </div>
  ),
};
