import express from 'express';

import userRouter from './users/router';


const app = express();

app.get('/', (req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ a: 2 }));
});

app.use('/', userRouter);

export default app;
