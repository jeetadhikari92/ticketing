import request from 'supertest';
import { app } from '../../app';

it('Returns 400 when not existing email is sent', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'jeet@gmail.com',
      password: 'sowtasd'
    })
    .expect(400)
})

it('Returns 400 when wrong password is entered for existing email', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'jeet@gmail.com',
      password: 'sowtasd'
    })
    .expect(201)
  
  return request(app)
  .post('/api/users/signin')
  .send({
    email: 'jeet@gmail.com',
    password: 'wrongpassword'
  })
  .expect(400)
})

it('Cookies is set after a successful signin', async () => {
  await request(app)
    .post('/api/users/signup')
    .send({
      email: 'jeet@gmail.com',
      password: 'password'
    })
    .expect(201)
  
  const response = await request(app)
  .post('/api/users/signin')
  .send({
    email: 'jeet@gmail.com',
    password: 'password'
  })
  .expect(200)

  expect(response.get('Set-Cookie')).toBeDefined()
})