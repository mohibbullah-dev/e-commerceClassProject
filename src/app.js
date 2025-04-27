import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WHITELIST } from './constant.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(
  cors({
    origin: WHITELIST,
    credentials: true,
  }),
);
app.use(cookieParser());

// all routes
import healthCheckerRoute from './routes/healthCheck.route.js';
import userRouter from './routes/user.router.js';

app.use(healthCheckerRoute);
app.use('/api/v1', userRouter);

app.use(errorHandler);
export { app };
