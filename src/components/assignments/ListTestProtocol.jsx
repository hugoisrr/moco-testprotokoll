import { ListGroup } from 'react-bootstrap';
import {
  rowColorVariant,
  rowIcon,
  validateVoltage,
  validateTemperature,
} from '../../helper/validationsBoardTests';

export const expandRowTestProtocol = {
  renderer: (row) => (
    <ListGroup variant='flush'>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.activeDisplay)}`}
      >
        Display ansteuern, Leuchten alle Segmente?{' - '}
        <i className={`${rowIcon(row.testProtocol.activeDisplay)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.lightsUpLED)}`}
      >
        Leuchtet die LED{' - '}
        <i className={`${rowIcon(row.testProtocol.lightsUpLED)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.alarmSequence)}`}
      >
        Alarmsequenz komplett zu hören?{' - '}
        <i className={`${rowIcon(row.testProtocol.alarmSequence)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${validateVoltage(row.testProtocol.voltageValue)}`}
      >
        Spannungswert? (Sollwert 12V +- 0,5V){' - Wert: '}
        <strong>{`${row.testProtocol.voltageValue}`} mV</strong>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${validateTemperature(row.testProtocol.temperature)}`}
      >
        gemessene Temperatur? (Sollwert Raumtemperatur){' - Wert: '}
        <strong>{`${row.testProtocol.temperature}`} °C</strong>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.functionKeyboard)}`}
      >
        Funktion der Tasten?{' - '}
        <i className={`${rowIcon(row.testProtocol.functionKeyboard)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.rotateShaft)}`}
      >
        Welle drehen, Drehzahl wird angezeigt?{' - '}
        <i className={`${rowIcon(row.testProtocol.rotateShaft)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.hallSensors)}`}
      >
        Hallsensoren werden gemessen{' - '}
        <i className={`${rowIcon(row.testProtocol.hallSensors)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.individualPhases)}`}
      >
        Funktionieren die einzeinen Phasen?{' - '}
        <i className={`${rowIcon(row.testProtocol.individualPhases)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.switchCommutation)}`}
      >
        Kommutierung einschalten{' - '}
        <i className={`${rowIcon(row.testProtocol.switchCommutation)}`}></i>
      </ListGroup.Item>
      <ListGroup.Item
        variant={`${rowColorVariant(row.testProtocol.increaseSpeedEngine)}`}
      >
        Drehzahl erhöhen, reagiert der Motor?{' - '}
        <i className={`${rowIcon(row.testProtocol.increaseSpeedEngine)}`}></i>
      </ListGroup.Item>
    </ListGroup>
  ),
  showExpandColumn: true,
};
