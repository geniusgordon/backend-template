import app from './app';
import { connectDb, disconnectDb } from './db';
import { port } from './config';

/* eslint-disable no-console */
connectDb().then(() => {
  return new Promise((resolve, reject) => {
    const server = app.listen(port);
    server.on('listening', () => {
      console.log(`listening on port: ${port}`);
    });
    server.on('error', (err) => {
      reject(err);
    });
  });
}).catch((err) => {
  console.log(err);
}).then(disconnectDb);

