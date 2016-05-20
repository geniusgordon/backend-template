process.env.NODE_ENV = process.env.NODE_ENV || 'development';

export const port = process.env.PORT || 3000;
export const host = process.env.HOST || `localhost:${port}`;

export const dbUrl = {
  production: process.env.DB_URL || 'mongodb://localhost/backend',
  development: process.env.DB_DEV_URL || 'mongodb://localhost/backend-dev',
  test: process.env.DB_TEST_URL || 'mongodb://localhost/backend-test',
};

export const jwtSecret = process.env.JWT_SECRET || 'SECRET';

