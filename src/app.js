import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { WHITELIST } from './constant.js';
import errorHandler from './middlewares/errorHandler.js';
import { rateLimit } from 'express-rate-limit';

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

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: (req, res) => (req.user ? 100 : 10),
  standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
  legacyHeaders: true,
  message:
    'Too many requests to this ip, plese try again later after 15 munites',
  keyGenerator: (req) => req.ip,
  // store: ... , // Redis, Memcached, etc. See below.
});

// app.use(limiter);

// all routes starts
import healthCheckerRoute from './routes/healthCheck.route.js';
import userRouter from './routes/user.router.js';
import categoryRoute from './routes/category.router.js';
import subcategoryRoute from './routes/subcategory.router.js';
import groupRoute from './routes/group.route.js';

app.use(healthCheckerRoute);
app.use('/api/v1', userRouter);
app.use('/api/v1', categoryRoute);
app.use('/api/v1', subcategoryRoute);
app.use('/api/v1', groupRoute);

// all routes ends

app.use(errorHandler);
export { app };
