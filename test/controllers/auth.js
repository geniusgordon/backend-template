import { expect } from 'chai';
import { generateToken, verifyToken } from '../../src/controllers/auth';

describe('Auth controller', () => {
  describe('#generateToken', () => {
    it('generate token', () => {
      return generateToken({
        _id: 123,
        username: 'abc',
      }).then((token) => {
        expect(token).to.be.a('string');
      });
    });
  });

  describe('#verifyToken', () => {
    it('verify valid token', () => {
      return generateToken({
        _id: 123,
        username: 'abc',
      }).then((token) => {
        return verifyToken(token);
      }).then((user) => {
        expect(user).to.have.property('id').that.equals(123);
        expect(user).to.have.property('username').that.equals('abc');
      });
    });
    it('verify invalid token', () => {
      return verifyToken('123').catch((err) => {
        expect(err.message).to.exist;
      });
    });
  });
});

