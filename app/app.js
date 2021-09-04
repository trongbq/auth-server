import express from 'express';

import userRouter from './users/router';


const app = express();

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/text');
    res.end('Welcome to Auth Server');
});

app.use('/', userRouter);

export default app;
