import request from 'supertest';
import { server } from '../src';

test('POST /api/users should create a new user and return the created record', async () => {
  const newUser = { username: 'John', age: 25, hobbies: ['running', 'swimming'] };
  const response = await request(server).post('/api/users').send(newUser);
  expect(response.status).toBe(201);
  expect(response.body).toMatchObject(newUser);
});
