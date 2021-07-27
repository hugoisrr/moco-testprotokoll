import { validationResult } from 'express-validator';
import Assignment from '../models/Assignment';
import Board from '../models/Board';
import {
  getAssignmentById,
  getAssignmentByNumber,
  createNewAssignment,
} from '../services/assignment.service';

export async function createAssignment(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { number } = req.body;

  const assignmentExists = await getAssignmentByNumber(number);

  if (assignmentExists)
    return res
      .status(400)
      .json({ message: `Auftrag ${number} ist bereits vorhanden.` });

  //   Saving a new Assignment
  try {
    const assignment = await createNewAssignment(number);

    return res.status(200).json(assignment);
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
}

export async function getAssignment(req, res) {
  try {
    const assignment = await getAssignmentById(req.params.id);
    if (!assignment)
      return res.status(404).json({ message: 'Auftrag nicht gefunden' });

    return res.json(assignment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(404).json({ message: 'Auftrag nicht gefunden' });
    return res.status(500).send('Server Error');
  }
}

export async function showAssignments(req, res) {
  try {
    const assignmentsList = await Assignment.find().sort({ createdAt: -1 });
    return res.json(assignmentsList);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send('Server Error');
  }
}

export async function deleteAssignment(req, res) {
  //TODO delete test protocols that are related
  try {
    const assignment = await getAssignmentById(req.params.id);
    if (!assignment)
      return res.status(400).json({ message: 'Auftrag existiert nicht' });
    await assignment.deleteOne();
    return res.json({ message: 'Auftrag gelöscht' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Auftrag nicht gefunden' });
    }
    return res.status(500).send('Auftrag nicht gefunden');
  }
}
