import express from 'express';
import { clientAuthenticate } from './middlewares';
import userInfo from './userInfo';
import registerUser from './registerUser';

const router = express.Router();

router.use(clientAuthenticate);

router.get('/userInfo', userInfo);
router.post('/users', registerUser);

export default router;
