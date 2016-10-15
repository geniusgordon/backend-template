/* eslint-disable import/prefer-default-export */

export class Http400Error extends Error {
  constructor(...args) {
    super(...args);
    this.code = 400;
  }
}

