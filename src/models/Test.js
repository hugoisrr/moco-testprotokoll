import mongoose, { Schema, model } from 'mongoose';

const testSchema = new Schema({
  activeDisplay: {
    type: Boolean,
    default: false,
  },
});

export default model('Test', testSchema);
