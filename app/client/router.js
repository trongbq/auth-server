import express from 'express';
import { clientAuthenticate } from './middlewares';
import userInfo from './userInfo';
import registerUser, { validators as regUserValidators } from './registerUser';

const router = express.Router();

router.use(clientAuthenticate);

router.get('/userInfo', userInfo);
router.post('/users', regUserValidators, registerUser);

export default router;
