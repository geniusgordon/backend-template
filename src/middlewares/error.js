/* eslint-disable no-unused-vars, import/prefer-default-export */

function http400Handler(err, req, res, next) {
  res.status(400).json({ message: err.message });
}

function http500Handler(err, req, res, next) {
  const response = process.env.NODE_ENV === 'production'
    ? { message: 'Something went wrong :(' } : {
      message: err.message,
      stack: err.stack.split('\n'),
    };
  res.status(500).json(response);
}

export function errorHandler(err, req, res, next) {
  if (err.code === 400) {
    http400Handler(err, req, res, next);
  } else {
    http500Handler(err, req, res, next);
  }
}

