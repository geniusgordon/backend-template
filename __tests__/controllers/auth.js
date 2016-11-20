import { generateToken, verifyToken } from '../../src/controllers/auth';

describe('generateToken', () => {
  it('generate token', async () => {
    const token = await generateToken({
      _id: 123,
      username: 'abc',
    });
    expect(token).toBeDefined;
  });
});

describe('verifyToken', () => {
  it('verify valid token', async () => {
    const token = await generateToken({
      _id: 123,
      username: 'abc',
    });
    const user = await verifyToken(token);
    expect(user.id).toBe(123);
    expect(user.username).toBe('abc');
  });
  it('verify invalid token', () => {
    return verifyToken('123').catch((err) => {
      expect(err.message).toBeDefined;
    });
  });
});

