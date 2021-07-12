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
      activeDisplay: {
        type: Boolean,
        default: false,
      },
      lightsUpLED: {
        type: Boolean,
        default: false,
      },
      alarmSequence: {
        type: Boolean,
        default: false,
      },
      voltageValue: {
        type: Number,
        required: true,
      },
      temperature: {
        type: Number,
        required: true,
      },
      functionKeyboard: {
        type: Boolean,
        default: false,
      },
      rotateShaft: {
        type: Boolean,
        default: false,
      },
      hallSensors: {
        type: Boolean,
        default: false,
      },
      individualPhases: {
        type: Boolean,
        default: false,
      },
      switchCommutation: {
        type: Boolean,
        default: false,
      },
      increaseSpeedEngine: {
        type: Boolean,
        default: false,
      },
    },
  },
  {
    timestamps: true,
  }
);

export default model('TestProtocol', testProtocolSchema);
