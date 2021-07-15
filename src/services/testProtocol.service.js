import TestProtocol from '../models/TestProtocol';

export const testProtocolObject = {
  tester: 0,
  result: false,
  test: {
    activeDisplay: false,
    lightsUpLED: false,
    alarmSequence: false,
    voltageValue: 0,
    temperature: 0,
    functionKeyboard: false,
    rotateShaft: false,
    hallSensors: false,
    individualPhases: false,
    switchCommutation: false,
    increaseSpeedEngine: false,
  },
};

export function subSetNumericValues({ tester, voltageValue, temperature }) {
  return { tester, voltageValue, temperature };
}

export function subSetBooleanValues({
  activeDisplay,
  lightsUpLED,
  alarmSequence,
  functionKeyboard,
  rotateShaft,
  hallSensors,
  individualPhases,
  switchCommutation,
  increaseSpeedEngine,
}) {
  return {
    activeDisplay,
    lightsUpLED,
    alarmSequence,
    functionKeyboard,
    rotateShaft,
    hallSensors,
    individualPhases,
    switchCommutation,
    increaseSpeedEngine,
  };
}
export function stringValuesConvertToNumber(stringObject) {
  let numericValuesConverted = {};

  Object.entries(stringObject).forEach(([key, val]) => {
    numericValuesConverted[key] = Number(val);
  });

  return numericValuesConverted;
}

export function stringValuesConvertToBoolean(stringObject) {
  let booleanValuesConverted = {};

  Object.entries(stringObject).forEach(([key, val]) => {
    booleanValuesConverted[key] = !!Number(val);
  });
  return booleanValuesConverted;
}

export function testProtocolResult(
  testProtocolBooleans,
  temperature,
  voltageValue
) {
  let result = true;

  //   verify if within the boolean values there are false answers
  if (Object.values(testProtocolBooleans).includes(false)) {
    return !result;
  }
  //   verify if temperature is room temperature
  else if (temperature < 20 || temperature > 37) {
    return !result;
  }
  // verify if voltageValue is valid
  else if (voltageValue < 11500 || voltageValue > 12500) {
    return !result;
  }

  return result;
}

export async function createTestProtocol(testProtocol) {
  const newTestProtocol = new TestProtocol(testProtocol);

  return await newTestProtocol.save();
}
