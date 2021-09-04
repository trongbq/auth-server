import express from 'express';
import userInfo from './userInfo';

const router = express.Router();

router.get('/userInfo', userInfo);

export default router;
