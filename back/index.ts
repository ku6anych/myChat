import express from 'express';
import mongoose from 'mongoose';
import config from './config';

const app = express();
const port = 8000;

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
  });

  process.on('exit', () => {
    mongoose.disconnect();
  });
};

run().catch((e) => console.error(e));
