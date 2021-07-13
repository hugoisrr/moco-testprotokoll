import Board from '../models/Board';

export async function existsOrCreateBoard(serialNumber) {
  const boardExists = await Board.findOne({ serialNumber });

  if (boardExists) return boardExists;

  try {
    const newBoard = new Board({
      serialNumber,
    });

    const board = await newBoard.save();

    return board;
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function validateBoardBelongsToAssignment(
  assignmentNumber,
  serialNumber
) {
  return false;
}
