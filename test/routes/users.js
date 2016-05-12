import { expect } from 'chai';
import axios from 'axios';
import { postWithError } from '../helper';
import { start, stop } from '../../src/server';
import { port } from '../../src/core/config';
import User from '../../src/models/User';

if (process.env.NODE_ENV !== 'test') {
  throw new Error('should run with NODE_ENV=test');
}

const host = `http://localhost:${port}`;

describe('User route', () => {
  before(() => {
    return start().then(() => {
      return User.remove({});
    });
  });

  after(() => {
    return stop();
  });

  describe('GET /users', () => {
    it('should get all users', () => {
      return axios(`${host}/users`)
      .then(({ data }) => {
        expect(data.users).to.be.a('array');
      });
    });
  });

  describe('POST /users/create', () => {
    const url = `${host}/users/create`;

    it('should create a new user', () => {
      return axios.post(url, { username: 'x', password: '123' })
      .then(({ data }) => {
        expect(data.success).to.be.true;
        expect(data.token).to.be.a('string');
      });
    });

    it('should get an empty field error', () => {
      return postWithError(url, {});
    });

    it('should get an user exists error', () => {
      return postWithError(url, { username: 'x', password: '123' });
    });
  });

  describe('POST /users/login', () => {
    const url = `${host}/users/login`;

    it('should login', () => {
      return axios.post(url, { username: 'x', password: '123' })
      .then(({ data }) => {
        expect(data.success).to.be.true;
        expect(data.token).to.be.a('string');
      });
    });

    it('should get an empty field error', () => {
      return postWithError(url, {});
    });

    it('should get an user not exist error', () => {
      return postWithError(url, { username: 'xxx', password: 'xxx' });
    });

    it('should get a password incorrect error', () => {
      return postWithError(url, { username: 'x', password: 'xxx' });
    });
  });
});

