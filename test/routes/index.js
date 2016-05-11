import { expect } from 'chai';
import { start, stop } from '../../src/server';
import { port } from '../../src/core/config';
import fetch from 'isomorphic-fetch';

const host = `http://localhost:${port}`;

describe('Index route', () => {
  before(() => {
    return start();
  });

  after(() => {
    return stop();
  });

  describe('GET /', () => {
    it('should get default message', () => {
      return fetch(`${host}/`)
      .then((res) => res.json())
      .then((body) => {
        expect(body).to.deep.equal({
          message: 'this is a backend template',
        });
      });
    });
  });
});


