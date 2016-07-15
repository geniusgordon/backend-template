import { expect } from 'chai';
import { generateToken, verifyToken } from '../../src/controllers/auth';

describe('Auth controller', () => {
  describe('#generateToken', () => {
    it('generate token', async () => {
      const token = await generateToken({
        _id: 123,
        username: 'abc',
      });
      expect(token).to.be.a('string');
    });
  });

  describe('#verifyToken', () => {
    it('verify valid token', async () => {
      const token = await generateToken({
        _id: 123,
        username: 'abc',
      });
      const user = await verifyToken(token);
      expect(user).to.have.property('id').that.equals(123);
      expect(user).to.have.property('username').that.equals('abc');
    });
    it('verify invalid token', () => {
      return verifyToken('123').catch((err) => {
        expect(err.message).to.exist;
      });
    });
  });
});

