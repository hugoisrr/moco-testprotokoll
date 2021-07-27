import Board from '../models/Board';
import config from '../config';

export async function getBoardById(id) {
  return await Board.findById(id);
}

export async function existsOrCreateBoard(serialNumber) {
  let boardExists = true;
  let board = await Board.findOne({ serialNumber });

  if (board) return { board, boardExists };

  const newBoard = new Board({
    serialNumber,
  });

  board = await newBoard.save();
  boardExists = false;

  return { board, boardExists };
}

export async function addSetBoardToAssignment(assignment, board) {
  assignment.boards.addToSet(board);
  return await assignment.save();
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
