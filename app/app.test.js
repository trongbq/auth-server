import request from 'supertest';
import app, { init as appInit, close as appClose } from './app';

describe('Root path', () => {
  beforeAll((done) => {
    appInit().then(() => {
      done();
    });
  });
  afterAll((done) => {
    appClose().then(() => {
      done();
    });
  });
  test('it should response to GET', (done) => {
    request(app)
      .get('/')
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
