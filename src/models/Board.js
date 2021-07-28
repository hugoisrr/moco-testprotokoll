import { Schema, model } from 'mongoose';

const boardSchema = new Schema({
  serialNumber: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    min: 4,
  },
  testProtocols: [
    {
      type: Schema.Types.ObjectId,
      ref: 'TestProtocol',
    },
  ],
});

export default model('Board', boardSchema);
