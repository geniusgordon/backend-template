import { expect } from 'chai';
import api from '../api';
import { start, stop } from '../../src/server';
import { port } from '../../src/core/config';
import User from '../../src/models/User';

if (process.env.NODE_ENV !== 'test') {
  throw new Error('should run with NODE_ENV=test');
}

const host = `http://localhost:${port}`;

describe('User route', () => {
  let token;

  before(async () => {
    await start();
    await User.remove({});
  });

  after(() => {
    return stop();
  });

  describe('GET /users', () => {
    it('should get all users', async () => {
      const res = await api.get(`${host}/users`);
      const data = await res.json();
      expect(res.status).to.equal(200);
      expect(data.users).to.be.a('array');
    });
  });

  describe('POST /users/signup', () => {
    const url = `${host}/users/signup`;

    it('should create a new user', async () => {
      const res = await api.post(url, { username: 'x', password: '123' });
      const data = await res.json();
      expect(res.status).to.equal(200);
      expect(data.success).to.be.true;
      expect(data.token).to.be.a('string');
    });

    it('should get an empty field error', async () => {
      const { status } = await api.post(url, {});
      expect(status).to.equal(400);
    });

    it('should get an user exists error', async () => {
      const { status } = await api.post(url, {
        username: 'x',
        password: '123',
      });
      expect(status).to.equal(400);
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
      expect(res.status).to.equal(200);
      expect(data.success).to.be.true;
      expect(data.token).to.be.a('string');
      token = data.token;
    });

    it('should get an empty field error', async () => {
      const { status } = await api.post(url, {});
      expect(status).to.equal(400);
    });

    it('should get an user not exist error', async () => {
      const { status } = await api.post(url, {
        username: 'xxx',
        password: 'xxx'
      });
      expect(status).to.equal(400);
    });

    it('should get a password incorrect error', async () => {
      const { status } = await api.post(url, {
        username: 'x',
        password: 'xxx'
      });
      expect(status).to.equal(400);
    });
  });

  describe('GET /users/me', () => {
    const url = `${host}/users/me`;

    it('should get an unauthorized error', async () => {
      const res = await api.get(url);
      const data = await res.json();
      expect(res.status).to.equal(400);
      expect(data.message).to.be.a('string');
    });

    it('should get user infomation', async () => {
      const res = await api.get(url, {
        authorization: `Bearer ${token}`,
      })
      const data = await res.json();
      expect(data.username).to.equal('x');
    });
  });
});

