import request from 'supertest';
import { app } from '../../app';

it('should return 201 when valid email and password is sent', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'jeet@gmail.com',
      password: 'test1234'
    })
    .expect(201)
})

it('should return 400 when invalid email and password is sent', async () => {
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'jeetgmail.com',
      password: 'test'
    })
    .expect(400);
})

it('should return 400 when email or password is missing', async() => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'jeet@gmail.com',
  })
  .expect(400)
 
  return request(app)
    .post('/api/users/signup')
    .send({
      password: 'somepassword'
    })
    .expect(400)
})

it('disallows duplicate email to signup', async() => {
  await request(app)
  .post('/api/users/signup')
  .send({
    email: 'jeet@gmail.com',
    password: 'somepassword'
  })
  .expect(201)
 
  return request(app)
    .post('/api/users/signup')
    .send({
      email: 'jeet@gmail.com',
      password: 'somepassword'
    })
    .expect(400)
})

it('sets a cookie after signup', async() => {
  const response = await request(app)
  .post('/api/users/signup')
  .send({
    email: 'jeet@gmail.com',
    password: 'somepassword'
  })
  .expect(201)
  
  expect(response.get('Set-Cookie')).toBeDefined()
  
})