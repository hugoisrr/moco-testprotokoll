import mongoose, { Schema, model } from 'mongoose';

const testProtocolSchema = new Schema(
  {
    tester: {
      type: Number,
      required: true,
    },
    result: {
      type: Boolean,
      default: false,
    },
    test: {
      type: Schema.Types.ObjectId,
      ref: 'Test',
    },
  },
  {
    timestamps: true,
  }
);

export default model('TestProtocol', testProtocolSchema);
