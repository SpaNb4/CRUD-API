import request from 'supertest';
import { mockedUsers } from '../setupTests';
import { server } from '../src';

test('GET /api/users should return all existing users', async () => {
  const response = await request(server).get('/api/users');

  expect(response.status).toBe(200);

  expect(response.body).toEqual(mockedUsers);
});
