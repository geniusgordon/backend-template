import { expect } from 'chai';
import { start, stop } from '../../src/server';
import { port } from '../../src/core/config';
import axios from 'axios';

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
      return axios(`${host}/`)
      .then((response) => {
        expect(response.data).to.deep.equal({
          message: 'this is a backend template',
        });
      });
    });
  });
});


