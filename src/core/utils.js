export function validateString(fieldname, value, options = {}) {
  if (typeof value !== 'string') {
    throw new Error(`${fieldname} should be a string`);
  }
  if (options.required && value.trim().length === 0) {
    throw new Error(`${fieldname} should not be empty`);
  }
}

