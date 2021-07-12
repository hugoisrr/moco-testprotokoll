import { validationResult } from 'express-validator';
import Assignment from '../models/Assignment';

export async function createAssignment(req, res) {
  // Validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { number } = req.body;

  const assignmentExists = await Assignment.findOne({ number });

  if (assignmentExists)
    return res.status(400).json({ message: 'Assignment exists.' });

  //   Saving a new Assignment
  try {
    const newAssignment = new Assignment({
      number,
    });

    const assignment = await newAssignment.save();

    return res.status(200).json({
      message: 'Assignment created',
      assignment,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
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
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment)
      return res.status(400).json({ message: 'Auftrag existiert nicht' });
    await Assignment.findByIdAndDelete(req.params.id);
    return res.json({ message: 'Auftrag gelöscht' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ message: 'Picture not found' });
    }
    return res.status(500).send('Auftrag nicht gefunden');
  }
}
