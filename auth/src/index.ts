import mongoose from 'mongoose';
import { app } from './app';

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

