import { start, stop } from '../../src/server';
import { host } from '../../src/core/config';
import api from '../../src/core/api';
import User from '../../src/models/User';

if (process.env.NODE_ENV !== 'test') {
  throw new Error('should run with NODE_ENV=test');
}

let token;

beforeAll(async () => {
  await start();
  await User.remove({});
});

afterAll(() => {
  return stop();
});

describe('GET /users', () => {
  it('should get all users', async () => {
    const res = await api.get(`${host}/users`);
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.users).toBeInstanceOf(Array);
  });
});

describe('POST /users/signup', () => {
  const url = `${host}/users/signup`;

  it('should create a new user', async () => {
    const res = await api.post(url, { username: 'x', password: '123' });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.token).toBeDefined;
  });

  it('should get an empty field error', async () => {
    const { status } = await api.post(url, {});
    expect(status).toBe(400);
  });

  it('should get an user exists error', async () => {
    const { status } = await api.post(url, {
      username: 'x',
      password: '123',
    });
    expect(status).toBe(400);
  });
});

describe('POST /users/login', () => {
  const url = `${host}/users/login`;

  it('should login', async () => {
    const res = await api.post(url, {
      username: 'x',
      password: '123'
    });
    const data = await res.json();
    expect(res.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.token).toBeDefined;
    token = data.token;
  });

  it('should get an empty field error', async () => {
    const { status } = await api.post(url, {});
    expect(status).toBe(400);
  });

  it('should get an user not exist error', async () => {
    const { status } = await api.post(url, {
      username: 'xxx',
      password: 'xxx'
    });
    expect(status).toBe(400);
  });

  it('should get a password incorrect error', async () => {
    const { status } = await api.post(url, {
      username: 'x',
      password: 'xxx'
    });
    expect(status).toBe(400);
  });
});

describe('GET /users/me', () => {
  const url = `${host}/users/me`;

  it('should get an unauthorized error', async () => {
    const res = await api.get(url);
    const data = await res.json();
    expect(res.status).toBe(400);
    expect(data.message).toBeDefined;
  });

  it('should get user infomation', async () => {
    const res = await api.get(url, {
      authorization: `Bearer ${token}`,
    })
    const data = await res.json();
    expect(data.username).toBe('x');
  });
});

