import { validateString } from '../src/core/utils';

describe('#validateField', () => {
  it('should validate a non-empty string', () => {
    expect(() => validateString('str', 'str')).not.toThrow();
    expect(() => validateString('str', '')).not.toThrow();
    expect(() => validateString('str', '', { required: true })).toThrow();
    expect(() => validateString('str')).toThrow();
  });
});

