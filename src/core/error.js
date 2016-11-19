export default class HttpError extends Error {
  constructor(status, ...args) {
    super(...args);
    this.status = status;
  }
}

