import { expect } from 'chai';
import { validateString } from '../src/core/utils';

describe('Utils', () => {
  describe('#validateField', () => {
    it('should validate a non-empty string', () => {
      expect(() => validateString('str', 'str')).to.not.throw(Error);
      expect(() => validateString('str', '')).to.not.throw(Error);
      expect(() => validateString('str', '', { required: true })).to.throw(Error);
      expect(() => validateString('str')).to.throw(Error);
    });
  });
});

