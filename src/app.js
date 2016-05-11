import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import router from './routes';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(router);

/* eslint-disable no-unused-vars */
app.use((err, req, res, next) => {
  res.status(500).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ?
      '' : err.stack.split('\n'),
  });
});
/* eslint-enable no-unused-vars */

app.use((req, res) => {
  res.status(404).json({
    message: 'no such route',
  });
});

export default app;

