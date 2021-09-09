import { body } from 'express-validator';
import { saveUser } from './repository';

export function validators() {
  return [
    body('email', 'Invalid email').exists().isEmail(),
    body('password', 'Invalid password').exists(),
  ];
}

async function registerUser(req, res, next) {
  // Validate input
  const { email, password } = req.body;

  // Save to database
  await saveUser(email, password);
  
  res.status(201).end();
}

export default registerUser;
