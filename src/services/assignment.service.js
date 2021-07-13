import Assignment from '../models/Assignment';

export async function getAssignmentById(id) {
  return await Assignment.findById(id);
}
