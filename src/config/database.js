import { connect } from 'mongoose';
import config from '../config';

const connectDB = async () => {
  try {
    await connect(config.mongodb, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    console.log('\x1b[40m%s\x1b[0m', 'Database is connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
