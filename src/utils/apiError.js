class ApiError extends Error {
  constructor(
    statusCode,
    message = 'something went wrong',
    errors = {},
    stack = '',
    errorCode = '',
  ) {
    this.name = this.constructor.name;
    this.success = false;
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
    this.errorCode = errorCode;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  //   401 unauthorized
  static unauthorized(
    message = 'authorized',
    error = {},
    errorCode = 'AUTH_401',
  ) {
    return new ApiError(401, message, error, '', errorCode);
  }

  static forbiden(message = 'forbiden', error = {}, errorCode = 'AUTH_403') {
    return new ApiError(403, message, error, '', errorCode);
  }

  static forbiden(message = 'forbiden', error = {}, errorCode = 'AUTH_403') {
    return new ApiError(403, message, error, '', errorCode);
  }

  static forbiden(message = 'forbiden', error = {}, errorCode = 'AUTH_403') {
    return new ApiError(403, message, error, '', errorCode);
  }

  static forbiden(message = 'forbiden', error = {}, errorCode = 'AUTH_403') {
    return new ApiError(403, message, error, '', errorCode);
  }
}
export default ApiError;
