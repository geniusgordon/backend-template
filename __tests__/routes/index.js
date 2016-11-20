import { start, stop } from '../../src/server';
import { host } from '../../src/core/config';
import api from '../../src/core/api';

beforeAll(() => {
  return start();
});

afterAll(() => {
  return stop();
});

describe('GET /', () => {
  it('should get default message', async () => {
    const res = await api.get(`${host}/`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data).toEqual({
      message: 'this is a backend template',
    });
  });
});

