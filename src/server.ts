import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

//detecting unhandled rejection
process.on('unhandledRejection', () => {
  console.log('unhandledRejection is detected');
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});
//detecting uncaught Exception
process.on('uncaughtException', () => {
  console.log('uncaughtException is detected');
  process.exit(1);
});
