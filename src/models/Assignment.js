import { Schema, model } from 'mongoose';

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

export default model('Assignment', assignmentSchema);
