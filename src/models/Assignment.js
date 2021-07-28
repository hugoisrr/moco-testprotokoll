import { Schema, model } from 'mongoose';
import Board from './Board';
import TestProtocol from './TestProtocol';

const assignmentSchema = new Schema(
  {
    number: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      minlength: 5,
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Board',
      },
    ],
  },
  {
    timestamps: true,
  }
);

// When deleteOne is called for an Assignment, the function finds first all
// its Boards that are related, then it iterates for each Board and deletes
// all the TestProtocols of the Boards that related. After that it performs
// the deletion of the Boards related to the Assignment
assignmentSchema.pre('deleteOne', { document: true }, async function (next) {
  try {
    let boardsToDelete = await Board.find({ _id: { $in: this.boards } });
    for (const board of boardsToDelete) {
      await TestProtocol.deleteMany({
        _id: { $in: board.testProtocols },
      });
    }
    await Board.deleteMany({ _id: { $in: this.boards } });
    return next();
  } catch (error) {
    return next(error);
  }
});

export default model('Assignment', assignmentSchema);
