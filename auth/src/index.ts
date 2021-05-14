import express from 'express';
import 'express-async-errors';
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundErrors } from './errors/not-found-errors';

const app = express();
 
app.use(express.json());
app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundErrors()
})
app.use(errorHandler)

app.listen(3000, () => {
  console.log('Auth service running at 3000!!')
})