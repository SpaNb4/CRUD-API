import request from 'supertest';
import { server } from '../src';
import { mockedUsers } from '../setupTests';

describe('PUT /api/users', () => {
  test('PUT /api/users/:userId should update the user and return the updated record', async () => {
    const updatedUser = { username: 'Updated Username', age: 40, hobbies: ['dancing'] };
    const userId = mockedUsers[0].id;

    const response = await request(server).put(`/api/users/${userId}`).send(updatedUser);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: userId, ...updatedUser });
  });

  test('PUT /api/users/:userId should return status code 400 and corresponding message if userId is invalid', async () => {
    const updatedUser = { username: 'Updated Username', age: 40, hobbies: ['dancing'] };
    const userId = 'invalidUserId';

    const response = await request(server).put(`/api/users/${userId}`).send(updatedUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: `Invalid user ID (Not a valid UUID): ${userId}` });
  });

  test("PUT /api/users/:userId should return status code 404 and corresponding message if record with id === userId doesn't exist", async () => {
    const updatedUser = { username: 'Updated Username', age: 40, hobbies: ['dancing'] };
    const userId = '456b3fa0-c339-4c1f-84df-04027eebdf7d';

    const response = await request(server).put(`/api/users/${userId}`).send(updatedUser);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('message');
  });
});
