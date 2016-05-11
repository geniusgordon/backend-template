import chalk from 'chalk';

/* eslint-disable no-console */
const logger = {
  info(...str) {
    console.log(chalk.green('[INFO]'), ...str);
  },
  error(err) {
    console.error(chalk.red('[ERROR]'), err.message);
    console.error(err.stack);
  },
};

export default logger;

