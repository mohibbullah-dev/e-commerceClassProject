import 'dotenv/config';
const PORT = process.env.PORT || 8000;
const WHITELIST = process.env.WHITELIST;
const MONGO_URL = process.env.DB_nodejs_connection_URL;
const NODE_ENV = process.env.NODE_ENV;
// const APP_URL =
//   NODE_ENV === 'production' ? process.env.APP_URL : `http://localhost:${PORT}`;

const APP_URL =
  NODE_ENV === 'production' ? process.env.APP_URL : `http://localhost:${PORT}`;

// JWT
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

// ACCESS_TOKEN
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = process.env.ACCESS_TOKEN_EXPIRES_IN;

// REFRESH_TOKEN
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;
const REFRESH_TOKEN_EXPIRES_IN = process.env.REFRESH_TOKEN_EXPIRES_IN;

// mail service
const MAIL_SERVICE = process.env.MAIL_SERVICE;
const MAIL_PORT = process.env.MAIL_PORT;
const MAIL_USER = process.env.MAIL_USER;
const MAIL_PASS = process.env.MAIL_PASS;

export {
  APP_URL,
  PORT,
  WHITELIST,
  MONGO_URL,
  NODE_ENV,
  JWT_SECRET,
  JWT_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRES_IN,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRES_IN,
  MAIL_SERVICE,
  MAIL_PORT,
  MAIL_USER,
  MAIL_PASS,
};
