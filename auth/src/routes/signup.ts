import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { User } from '../models/user'
import { RequestValidationError } from '../errors/request-validation-error';
import { BadRequestErrors } from '../errors/bad-request-errors';

const router = express.Router();

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('Provide a valid email id.'),
  body('password').trim().isLength({min: 4, max: 20}).withMessage('Password should be minimum 4 and max 20 letter')
],
async (req: Request, res: Response) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }
  const { email, password } = req.body;

  const isUserExisting = await User.findOne({email});
  if(isUserExisting) {
    throw new BadRequestErrors('User with this email already exists');
  }

  const user = User.build({email, password});
  await user.save();
  res.status(201).send(user)
})

export {router as signupRouter};