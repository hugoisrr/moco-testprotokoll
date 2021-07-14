import Board from '../models/Board';
import config from '../config';

export async function existsOrCreateBoard(serialNumber) {
  const boardExists = await Board.findOne({ serialNumber });

  if (boardExists) return boardExists;

  const newBoard = new Board({
    serialNumber,
  });

  const board = await newBoard.save();

  return board;
}

export async function validateBoardBelongsToAssignment(
  assignmentNumber,
  serialNumber
) {
  const regExp = new RegExp(config.regExpAssignmentNumber);
  const match = serialNumber.match(regExp);
  // console.log({ assignmentNumber, serialNumber, regExp, match: match[1] });

  // Compares the two strings, if they are equal returns true
  if (assignmentNumber.localeCompare(match[1]) === 0) return true;

  return false;
}
