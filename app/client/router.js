import express from 'express';
import asyncErrorHandler from '../lib/asyncErrorHandler';
import { clientAuthenticate } from './middlewares';
import userInfo from './handlers/userInfo';
import registerUser from './handlers/registerUser';

const router = express.Router();

router.use(clientAuthenticate);

router.get('/userInfo', userInfo);
router.post('/users', asyncErrorHandler(registerUser));

export default router;
