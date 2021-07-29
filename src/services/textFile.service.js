import moment from 'moment';
import { writeFile } from 'fs';
import 'moment/locale/de';
moment.locale('de');

import { getAssignmentNumberAndCreatedAtById } from '../services/assignment.service';

export async function createAssignmentTextFile(
  assignmentId,
  testProtocol,
  serialNumber
) {
  const { number, createdAt } = await getAssignmentNumberAndCreatedAtById(
    assignmentId
  );
  const textFileName = `MoCo_FKT_${number}_${moment(createdAt).format(
    'L-LT'
  )}.txt`;
  const testProtocolData = createTestProtocolData(
    number,
    testProtocol,
    serialNumber
  );
  writeFile(textFileName, testProtocolData, function (err, data) {
    if (err) {
      return console.error(err);
    }
  });
}
// {
//  testProtocol: {
//    test: {
//      activeDisplay: true,
//      lightsUpLED: true,
//      alarmSequence: true,
//      functionKeyboard: true,
//      rotateShaft: true,
//      hallSensors: true,
//      individualPhases: true,
//      switchCommutation: true,
//      increaseSpeedEngine: true,
//      voltageValue: 12345,
//      temperature: 22
//    },
//    result: true,
//    _id: 6102e087ac33010faf321e83,
//    tester: 342,
//    createdAt: 2021-07-29T17:08:23.494Z,
//    updatedAt: 2021-07-29T17:08:23.494Z,
//    __v: 0
//  }
//}
function createTestProtocolData(assignmentNumber, testProtocol, serialNumber) {
  const { test, result, tester, createdAt } = testProtocol;
  let testProtocolData = `
  Datum: ${moment(createdAt).format('L')}\n
  Uhrzeit: ${moment(createdAt).format('LT')}\n
  Prüfer: ${tester}\n
  Auftragsnummer: ${assignmentNumber}\n
  Seriennummer: ${serialNumber}\n
  ---\n
  Flashen des Atmel uController - OK\n
  Flashen des PSoC - OK\n
  Display ink. Tastatur anschließen - OK\n
  Lautsprecher anschließen - OK\n
  CAN-Verbindung herstellen - OK\n
  RCR-Baugruppe anschließen - OK\n
  Motor verbinden - OK\n
  Display ansteuern. Leuchten alle Segmente? - OK\n
  Leuchtet die LED? - NG\n
  Alarmsequenz komplett zu hören? - OK\n
  Spannungswert? (11500 - 12500 mV) - 12074 mV - OK\n
  Temperatur? (20 - 37 °C) - 40 °C - NG\n
  Funktion der Tasten? - OK\n
  Welle drehen. Drehzahl wird angezeigt? - OK\n
  Hallsensoren werden gemessen - OK\n
  Funktionieren die einzelnen Phasen? - OK\n
  Kommutierung einschalten - OK\n
  Drehzahl erhöhen. Reagiert der Motor? - OK\n
  ---\n
  Ergebnis - NG\n
  ------------------------------------------------------------\n
  `;
  return testProtocolData;
}
