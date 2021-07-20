import app from './app';
import connectDB from './config/database';

// PORT = 5000
// MONGODB_URL = mongodb://127.0.0.1/moco-test-protocol
// REGEXP_ASSIGNMENT_NUMBER = _.*_(.*?)-

async function main() {
  connectDB();
  const port = app.get('port');
  await app.listen(port, () =>
    console.log('\x1b[36m%s\x1b[0m', `Server started on port ${port}`)
  );
}

main();
