import { validationResult } from 'express-validator';
import { getAssignmentById } from '../services/assignment.service';
import {
  existsOrCreateBoard,
  validateBoardBelongsToAssignment,
} from '../services/board.service';

export async function addBoardToAssignment(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  const { serialNumber } = req.body;

  // Get the assignment and validate if exists
  const assignment = await getAssignmentById(req.params.assignmentId);
  if (!assignment)
    return res.status(404).json({ message: 'Auftrag nicht gefunden' });

  const { number, boards } = assignment;

  const belongsBoardToAssignment = await validateBoardBelongsToAssignment(
    number.slice(0, 5),
    serialNumber
  );
  // Verify if the assignment has the same number as in the serialNumber of the board
  if (!belongsBoardToAssignment)
    return res.status(404).json({
      message: 'Die Serialnummer stimmt nicht der Auftragnummber überein.',
    });

  try {
    // Creates new Board
    const board = await existsOrCreateBoard(serialNumber);

    // Add to set Board into array boards of Assignment, avoid duplicated boards into the assignment
    boards.addToSet(board);
    assignment.save();

    return res.status(200).json({
      message: 'Board added to the Assignment',
      board,
      assignment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}
