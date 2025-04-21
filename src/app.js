import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WHITELIST } from './constant.js';
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(
  cors({
    origin: function (origin, callback) {
      if (WHITELIST.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
  }),
);
app.use(cookieParser());
export { app };
