export function booleanConverter(stringObject) {
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
