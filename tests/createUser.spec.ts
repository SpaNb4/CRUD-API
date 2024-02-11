import request from 'supertest';
import { v4 as uuidv4 } from 'uuid';
import { server } from '../src';
import { ErrorMessages } from '../src/types';

jest.mock('uuid', () => ({
  v4: jest.fn(),
}));

describe('GET /api/users', () => {
  test('POST /api/users should create a new user and return the created record', async () => {
    const newUser = { username: 'John', age: 25, hobbies: ['running', 'swimming'] };

    jest.mocked(uuidv4).mockReturnValue('mockedId');
    const response = await request(server).post('/api/users').send(newUser);

    expect(response.status).toBe(201);
    expect(response.body).toEqual({ id: 'mockedId', ...newUser });
  });

  test('POST /api/users should return status code 400 and corresponding message if request body does not contain required fields', async () => {
    const newUser = { age: 25, hobbies: ['running', 'swimming'] };

    const response = await request(server).post('/api/users').send(newUser);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: ErrorMessages.MissingFields });
  });
});
