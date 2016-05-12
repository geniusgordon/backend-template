import { expect } from 'chai';
import fetch from 'isomorphic-fetch';
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
      return fetch(`${host}/users`)
      .then((res) => {
        expect(res.status).to.equal(200);
        return res.json();
      })
      .then((body) => {
        expect(body.users).to.be.a('array');
      });
    });
  });

  describe('POST /users/create', () => {
    function postUser(data) {
      return fetch(`${host}/users/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
    }

    it('should create a new user', () => {
      return postUser({ username: 'x', password: '123' })
      .then((res) => {
        expect(res.status).to.equal(200);
        return res.json();
      })
      .then((body) => {
        expect(body.success).to.be.true;
        expect(body.token).to.be.a('string');
      });
    });

    it('should get an empty field error', () => {
      return postUser({})
      .then((res) => {
        expect(res.status).to.equal(400);
        return res.json();
      })
      .then((body) => {
        expect(body.message).to.be.a('string');
      });
    });

    it('should get an user exists error', () => {
      return postUser({ username: 'x', password: '123' })
      .then((res) => {
        expect(res.status).to.equal(400);
        return res.json();
      })
      .then((body) => {
        expect(body.message).to.be.a('string');
      });
    });
  });
});

