import { expect } from 'chai';
import { start } from '../../src/server';

describe('Index route', () => {
  before(() => {
    return start();
  });

  describe('GET /', () => {
    it('should get default message');
  });
});

// message: 'this is a backend template',

