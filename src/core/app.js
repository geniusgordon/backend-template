import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import { bearerToken } from '../middlewares/auth';
import errorHandler from '../middlewares/error';
import cors from '../middlewares/cors';
import router from '../routes';

const app = express();

if (process.env.NODE_ENV !== 'test') {
  app.use(logger('dev'));
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bearerToken);
app.use(cors);

app.use(router);
app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({
    message: 'no such route',
  });
});

export default app;

