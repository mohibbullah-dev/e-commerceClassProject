import 'dotenv/config';
const PORT = process.env.PORT || 8000;
const WHITELIST = process.env.WHITELIST;
const MONGO_URL = process.env.DB_nodejs_connection_URL;

export { PORT, WHITELIST, MONGO_URL };
