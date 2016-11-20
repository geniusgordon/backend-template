function http500Handler(err, req, res) {
  const response = process.env.NODE_ENV === 'production'
    ? { message: 'Something went wrong :(' } : {
      message: err.message,
      stack: err.stack.split('\n'),
    };
  res.status(500).json(response);
}

export default function errorHandler(err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({
      message: err.message,
    });
  } else {
    http500Handler(err, req, res, next);
  }
}

