import request from 'supertest';
import { server } from '../src';

describe('Non-existing routes', () => {
  it('should return 404 and a human-friendly message', async () => {
    const response = await request(server).get('/some-non/existing/resource');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'GET route /some-non/existing/resource not found' });
  });
});
