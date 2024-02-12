import request from 'supertest';
import { server } from '../src';

jest.mock('../src/services/userService', () => ({
  getUsers: jest.fn().mockImplementation(() => {
    throw new Error('Test error');
  }),
}));

describe('Server Error Handling', () => {
  it('should respond with status code 500 and a human-friendly message when an error occurs', async () => {
    const response = await request(server).get('/api/users');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      message: 'Internal Server Error: Test error',
    });
  });
});
