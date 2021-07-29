import Assignment from '../models/Assignment';

export async function getAssignmentById(id) {
  return await Assignment.findById(id).populate({
    path: 'boards',
    model: 'Board',
    populate: {
      path: 'testProtocols',
      model: 'TestProtocol',
    },
  });
}

export async function getAssignmentNumberAndCreatedAtById(id) {
  return await Assignment.findOne(
    { _id: id },
    { number: 1, createdAt: 1, _id: 0 }
  );
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
