import express from 'express';
import userRouter from './users/router';
import {
  connect as dbConnect,
  disconnect as dbDisconnect,
} from './database/client';

const app = express();

app.get('/', (req, res, next) => {
  res.end('Welcome to Auth Server!!');
  next();
});

app.use('/', userRouter);

export async function init() {
  await dbConnect();
}

export async function close() {
  await dbDisconnect();
}

export function setPort(port) {
  app.set('port', port);
}

export default app;
