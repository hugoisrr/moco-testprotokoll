import Assignment from '../models/Assignment';

export async function getAssignmentById(id) {
  return await Assignment.findById(id);
}

export async function getAssignmentByNumber(number) {
  return await Assignment.findOne({ number });
}

export async function createNewAssignment(number) {
  const newAssignment = new Assignment({
    number,
  });

  const assignment = await newAssignment.save();
  return assignment;
}
