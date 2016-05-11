export const port = process.env.PORT || 3000;
export const host = process.env.HOST || `localhost:${port}`;

export const dbUrl = process.env.DB_URL || 'mongodb://localhost/backend';

export const jwtSecret = process.env.JWT_SECRET || 'SECRET';

