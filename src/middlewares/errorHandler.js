import { NODE_ENV } from '../constant.js';
import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal server error';
  const errors = err.errors || {};
  const errorCode = err.errorCode || '';
  const stack = NODE_ENV === 'development' ? err.stack : '';

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    errors,
    stack,
    errorCode,
  });
};

export default errorHandler;
