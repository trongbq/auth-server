import express from 'express';
import userRouter from './client/router';
import {
  connect as dbConnect,
  disconnect as dbDisconnect,
} from './lib/database/client';

const app = express();
app.use(express.json())

app.get('/', (req, res, next) => {
  res.end('Welcome to Auth Server!!');
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
