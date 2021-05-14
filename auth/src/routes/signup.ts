import express, {Request, Response} from 'express';
import { body, validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/request-validation-error';
import { DatabaseConnectionError } from '../errors/database-connection-error';

const router = express.Router();

router.post('/api/users/signup', [
  body('email').isEmail().withMessage('Provide a valid email id.'),
  body('password').trim().isLength({min: 4, max: 20}).withMessage('Password should be minimum 4 and max 20 letter')
],
(req: Request, res: Response) => { 
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    throw new RequestValidationError(errors.array())
  }

  throw new DatabaseConnectionError();

})

export {router as signupRouter};