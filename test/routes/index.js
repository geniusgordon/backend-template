import { expect } from 'chai';
import { start, stop } from '../../src/server';
import { port } from '../../src/core/config';
import api from '../api';

const host = `http://localhost:${port}`;

describe('Index route', () => {
  before(() => {
    return start();
  });

  after(() => {
    return stop();
  });

  describe('GET /', () => {
    it('should get default message', async () => {
      const res = await api.get(`${host}/`);
      const data = await res.json();
      expect(res.status).to.equal(200);
      expect(data).to.deep.equal({
        message: 'this is a backend template',
      });
    });
  });
});


