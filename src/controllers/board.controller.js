import { validationResult } from 'express-validator';
import Board from '../models/Board';
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
  const assignment = await getAssignmentById(req.params.id);
  if (!assignment)
    return res.status(404).json({ message: 'Auftrag nicht gefunden' });

  // Verify if the assignment has the same number as in the serialNumber of the board
  if (
    !validateBoardBelongsToAssignment(
      assignment.number.slice(0, 5),
      serialNumber
    )
  )
    return res
      .status(404)
      .json({
        message: 'Die Serialnummer stimmt nicht der Auftragnummber überein.',
      });
  //   Verify if Board already exists or create a new Board
}
