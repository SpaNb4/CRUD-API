import request from 'supertest';
import { server } from '../src';

jest.mock('../src/database/DB', () => ({
  users: [
    {
      id: '19931501-a044-4bbd-be35-47dd32edc68a',
      username: 'John',
      age: 25,
      hobbies: ['running', 'swimming'],
    },
  ],
}));

test('PUT /api/users/:userId should update the user and return the updated record', async () => {
  const updatedUser = { username: 'Updated Username', age: 40, hobbies: ['dancing'] };
  const userId = '19931501-a044-4bbd-be35-47dd32edc68a';
  const response = await request(server).put(`/api/users/${userId}`).send(updatedUser);
  expect(response.status).toBe(200);
  expect(response.body).toMatchObject(updatedUser);
});
