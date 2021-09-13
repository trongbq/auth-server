import express from 'express';
import userRouter from './client/router';
import {
  connect as dbConnect,
  disconnect as dbDisconnect,
} from './lib/database/client';
import { ValidationError } from 'joi';

const app = express();
app.use(express.json())

app.get('/', (req, res, next) => {
  res.end('Welcome to Auth Server!!');
});

app.use('/', userRouter);

app.use((error, req, res, next) => {
  // Handle error from Joi validator
  if (error instanceof ValidationError) {
    res.status(400).json({ errors: error['details'] });
  }

  // Other errors
  return res.status(500).json({ error: error.toString() });
});

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
