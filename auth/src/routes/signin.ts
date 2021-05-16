import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';
import { BadRequestErrors } from '../errors/bad-request-errors';
import { validateRequest } from '../middlewares/validate-request';
import { User } from '../models/user';
import { Password } from '../services/password';

const router = express.Router();

router.post('/api/users/signin', [
  body('email').isEmail().withMessage('Provide valid email'),
  body('password').trim().notEmpty().withMessage('Password cannot be empty')
],
validateRequest,
async (req: Request, res: Response) => { 
  const { email, password } = req.body;

  const existingUser = await User.findOne({email});
  if(!existingUser) {
    throw new BadRequestErrors('Bad credentials');
  }

  const passwordMatch = await Password.compare(
    existingUser.password, password
  )

  if(!passwordMatch) {
    throw new BadRequestErrors('Bad credentials');
  }

  const userJwt = jwt.sign({
    id: existingUser.id,
    email: existingUser.email
  }, process.env.JWT_KEY! )
  req.session = { jwt: userJwt };

  res.status(200).send(existingUser)
})

export {router as signinRouter};