import { config } from 'dotenv';
config();

export default {
  port: process.env.PORT || 6000,
  mongodb: process.env.MONGODB_URL,
  regExpAssignmentNumber: process.env.REGEXP_ASSIGNMENT_NUMBER,
};
