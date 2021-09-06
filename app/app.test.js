import request from 'supertest';
import app from './app';

describe('Root path', () => {
  test('it should response to GET', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
