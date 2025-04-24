import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  const { statusConde, message, errors, errorCode, stack } = err;
  return res
    .status(statusConde || 500)
    .json(ApiError.custom(statusConde, message, errors, stack, errorCode));
};

export default errorHandler;
