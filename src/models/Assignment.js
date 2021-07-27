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

assignmentSchema.pre('deleteOne', { document: true }, async function (next) {
  try {
    //TODO delete relationship with testprotocols
    await Board.deleteMany({ _id: { $in: this.boards } });
    next();
  } catch (error) {
    console.log(error);
  }
});

export default model('Assignment', assignmentSchema);
