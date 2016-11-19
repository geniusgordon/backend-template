/* eslint-disable import/prefer-default-export */
import HttpError from './error';

export function validateString(fieldname, value, options = {}) {
  if (typeof value !== 'string') {
    throw new HttpError(400, `${fieldname} should be a string`);
  }
  if (options.required && value.trim().length === 0) {
    throw new HttpError(400, `${fieldname} should not be empty`);
  }
}

