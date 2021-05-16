import express from 'express';
import 'express-async-errors';
import mongoose from 'mongoose';
import cookieSession from 'cookie-session'
import { errorHandler } from './middlewares/error-handler';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';
import { NotFoundErrors } from './errors/not-found-errors';

const app = express();
app.set('trust proxy', true)
app.use(express.json());
app.use(cookieSession({
  signed: false,
  secure: true
}))

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all('*', async () => {
  throw new NotFoundErrors()
})
app.use(errorHandler)

const start = async () => {
  if(!process.env.JWT_KEY) {
    throw new Error('No Jwt secret')
  }
  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true
    })
    console.log('Connected to mongodb!')
  } catch (err) {
    console.log(err)
  }
  app.listen(3000, () => {
    console.log('Auth service running at 3000!')
  })
}

start();

