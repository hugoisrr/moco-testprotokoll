import { validationResult } from 'express-validator';
import { getBoardById } from '../services/board.service';
import {
  subSetNumericValues,
  stringValuesConvertToNumber,
  stringValuesConvertToBoolean,
  subSetBooleanValues,
  testProtocolObject,
  testProtocolResult,
  createTestProtocol,
} from '../services/testProtocol.service';
import { createAssignmentTextFile } from '../services/textFile.service';

export async function addTestProtocolToBoard(req, res) {
  // Get the board and validate if exits
  const board = await getBoardById(req.params.boardId);
  if (!board)
    return res.status(404).json({ message: 'Platine nicht gefunden' });

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { testProtocols, serialNumber } = board;

  // Subset with numeric values of Object req.body
  const numericValues = subSetNumericValues(req.body);

  // Subset with boolean values of Object req.body
  let booleanValues = subSetBooleanValues(req.body);

  // Convert
  const { tester, voltageValue, temperature } =
    stringValuesConvertToNumber(numericValues);
  booleanValues = stringValuesConvertToBoolean(booleanValues);

  // Evaluate result from the Test Protocol
  const result = testProtocolResult(booleanValues, temperature, voltageValue);

  const newTestProtocolObject = {
    ...testProtocolObject,
    tester,
    result,
    test: {
      voltageValue,
      temperature,
      ...booleanValues,
    },
  };

  try {
    const newTestProtocol = await createTestProtocol(newTestProtocolObject);
    testProtocols.push(newTestProtocol);
    board.save();
    createAssignmentTextFile(
      req.body.assignmentId,
      newTestProtocol,
      serialNumber
    );

    return res.status(200).json({
      message: 'TestProtocol added to the Board',
      board,
      testProtocol: newTestProtocol,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}
