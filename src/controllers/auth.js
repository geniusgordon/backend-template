import { sign, verify } from 'jsonwebtoken';
import { jwtSecret } from '../core/config';
import HttpError from '../core/error';

export function generateToken(user) {
  return new Promise((resolve, reject) => {
    sign({
      id: user._id, // eslint-disable-line no-underscore-dangle
      username: user.username,
    }, jwtSecret, {
      expiresIn: '0.5y',
    }, (err, token) => {
      if (err) {
        reject(err);
      } else {
        resolve(token);
      }
    });
  });
}

export function verifyToken(token) {
  return new Promise((resolve, reject) => {
    verify(token, jwtSecret, (err, user) => {
      if (err) {
        reject(new HttpError(400, 'invalid token'));
      } else {
        resolve(user);
      }
    });
  });
}

