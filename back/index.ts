import express from 'express';
import mongoose from 'mongoose';
import config from './config';
import usersRouter from './routers/users';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import expressWs from 'express-ws';
import { IOnlineUser } from './types';

import { console } from 'inspector';

const app = express();
const port = 8000;
const router = express.Router();

const wsInstance = expressWs(app);
wsInstance.applyTo(router);

app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);

app.use(express.static('public'));
app.use(cookieParser());
app.use('/users', usersRouter);

const onlineUsers: IOnlineUser[] = [];

router.ws('/messages', async (ws, _req) => {
  let currentUser: IOnlineUser  | null = null;

  ws.on('message', async (message) => {
    try {
      const decoded = JSON.parse(message.toString());
      
      if (decoded.type === 'LOGIN' && decoded.payload?.token) {
        console.log("sd")
      }
    } catch (error) {

    }    

  });  

});


app.use(router);

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
