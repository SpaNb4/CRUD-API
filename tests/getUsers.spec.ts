import request from 'supertest';
import { server } from '../src';

jest.mock('../src/database/db', () => ({
  users: [],
}));

test('GET /api/users should return an empty array', async () => {
  const response = await request(server).get('/api/users');
  expect(response.status).toBe(200);
  expect(response.body).toEqual([]);
});
