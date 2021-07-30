import moment from 'moment';
import { writeFile, appendFileSync, existsSync } from 'fs';
import config from '../config';
import path from 'path';
import 'moment/locale/de';
moment.locale('de');

import { getAssignmentNumberAndCreatedAtById } from './assignment.service';
import {
  validateTemperatureValue,
  validateVoltageValue,
} from './testProtocol.service';

export async function createAssignmentTextFile(
  assignmentId,
  testProtocol,
  serialNumber
) {
  const { number, createdAt } = await getAssignmentNumberAndCreatedAtById(
    assignmentId
  );
  const textFilePath = createTextFilePath(
    config.pruefDatenServerAddress,
    number,
    createdAt
  );
  const testProtocolData = createTestProtocolData(
    number,
    testProtocol,
    serialNumber
  );
  try {
    if (!existsSync(textFilePath)) {
      writeFile(textFilePath, testProtocolData, function (err) {
        if (err) {
          return console.error(err);
        }
      });
    } else {
      appendFileSync(textFilePath, testProtocolData);
    }
  } catch (error) {
    console.log(error);
  }
}

function createTextFilePath(storagePath, number, createdAt) {
  return path.normalize(
    `${storagePath}/MoCo_FKT_${number}_${moment(createdAt).format('L')}.txt`
  );
}

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
  Display ansteuern. Leuchten alle Segmente? - ${booleanTextResponse(
    test.activeDisplay
  )}\n
  Leuchtet die LED? - ${booleanTextResponse(test.lightsUpLED)}\n
  Alarmsequenz komplett zu hören? - ${booleanTextResponse(test.alarmSequence)}\n
  Spannungswert? (11500 - 12500 mV) - ${
    test.voltageValue
  } mV - ${booleanTextResponse(!validateVoltageValue(test.voltageValue))}\n
  Temperatur? (20 - 37 °C) - ${test.temperature} °C - ${booleanTextResponse(
    !validateTemperatureValue(test.temperature)
  )}\n
  Funktion der Tasten? - ${booleanTextResponse(test.functionKeyboard)}\n
  Welle drehen. Drehzahl wird angezeigt? - ${booleanTextResponse(
    test.rotateShaft
  )}\n
  Hallsensoren werden gemessen - ${booleanTextResponse(test.hallSensors)}\n
  Funktionieren die einzelnen Phasen? - ${booleanTextResponse(
    test.individualPhases
  )}\n
  Kommutierung einschalten - ${booleanTextResponse(test.switchCommutation)}\n
  Drehzahl erhöhen. Reagiert der Motor? - ${booleanTextResponse(
    test.increaseSpeedEngine
  )}\n
  ---\n
  Ergebnis - ${booleanTextResponse(result)}\n
  ------------------------------------------------------------\n
  `;
  return testProtocolData;
}

function booleanTextResponse(value) {
  return value ? 'OK' : 'NG';
}
