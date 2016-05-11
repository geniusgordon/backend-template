import { expect } from 'chai';
import { generateHash, validatePassword } from '../../src/models/User';

describe('User model', () => {
  describe('#generateHash', () => {
    it('generates hash', () => {
      expect(generateHash('123')).to.be.a('string');
    });
  });

  describe('#validatePassword', () => {
    const expectedHash = generateHash('123');

    it('validates correct password', () => {
      expect(validatePassword('123', expectedHash)).to.be.true;
    });

    it('validates incorrect password', () => {
      expect(validatePassword('abc', expectedHash)).to.be.false;
    });
  });
});

