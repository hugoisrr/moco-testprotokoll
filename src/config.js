import { config } from 'dotenv';
import path from 'path';
config();

export default {
  port: process.env.PORT || 6000,
  mongodb: process.env.MONGODB_URL,
  regExpAssignmentNumber: process.env.REGEXP_ASSIGNMENT_NUMBER,
  pruefDatenServerAddress: path.normalize(
    process.env.PRUEFDATEN_SERVER_ADDRESS
  ),
};
