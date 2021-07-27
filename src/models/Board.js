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

boardSchema.pre('remove', function (next) {
  const TestProtocol = model('TestProtocol');
  TestProtocol.remove({ _id: { $in: this.testProtocols } }).then(() => next());
});

export default model('Board', boardSchema);
