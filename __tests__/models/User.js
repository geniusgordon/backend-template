import { generateHash, validatePassword } from '../../src/models/User';

describe('generateHash', () => {
  it('generates hash', () => {
    expect(generateHash('123')).toBeDefined;
  });
});

describe('validatePassword', () => {
  const expectedHash = generateHash('123');

  it('validates correct password', () => {
    expect(validatePassword('123', expectedHash)).toBe(true);
  });

  it('validates incorrect password', () => {
    expect(validatePassword('abc', expectedHash)).toBe(false);
  });
});

