import ApiError from '../utils/apiError.js';

const errorHandler = (err, req, res, next) => {
  //   throw ApiError.serverError(err.message, err.errors, err.errorCode);
  return res.json(ApiError.serverError(err.message, err.errors, err.errorCode)); // good way
};

export default errorHandler;
