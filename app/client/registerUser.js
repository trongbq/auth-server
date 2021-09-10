import Joi from 'joi';
import { saveUser } from './repository';

const schema = Joi.object({
  username: Joi.string()
               .alphanum()
               .min(2)
               .max(30)
               .required(),
  email: Joi.string()
            .email()
            .required(),
  password: Joi.string()
               .min(6)
               .max(30)
               .required(),
});

async function registerUser(req, res, next) {
  // Validate input
  const { username, email, password } = req.body;
  Joi.assert({ username, email, password }, schema);

  // Save to database
  await saveUser(username, email, password);
  
  res.status(201).end();
}

export default registerUser;
