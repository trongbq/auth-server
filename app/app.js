import express from 'express';
import userRouter from './users/router';
import { init as dbinit, close as dbclose } from './database/client';

const app = express();

app.get('/', (req, res, next) => {
  res.end('Welcome to Auth Server');
  next();
});

app.use('/', userRouter);

(async function() {
  await dbinit();
})();

export function close() {
  (async function() {
    await dbclose();
  })();
}

export function setPort(port) {
  app.set('port', port);
}

export default app;
