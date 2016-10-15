/* eslint-disable import/prefer-default-export */
import { Http400Error } from './error';

export function validateString(fieldname, value, options = {}) {
  if (typeof value !== 'string') {
    throw new Http400Error(`${fieldname} should be a string`);
  }
  if (options.required && value.trim().length === 0) {
    throw new Http400Error(`${fieldname} should not be empty`);
  }
}

