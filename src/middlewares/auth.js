import { Http400Error } from '../core/error';

export function loginRequired(req, res, next) {
  if (!req.token) {
    next(new Http400Error('You are not authorized'));
    return;
  }
  next();
}

export function bearerToken(req, res, next) {
  let token;

  if (req.query && req.query.access_token) {
    token = req.query.access_token;
  }

  if (req.body && req.body.access_token) {
    if (token) {
      throw new Http400Error('token should only be provided in one place');
    }
    token = req.body.access_token;
  }

  if (req.headers && req.headers.authorization) {
    const parts = req.headers.authorization.split(' ');
    if (parts.length === 2 && parts[0] === 'Bearer') {
      if (token) {
        throw new Http400Error('token should only be provided in one place');
      }
      token = parts[1];
    }
  }

  req.token = token; // eslint-disable-line no-param-reassign
  next();
}

