class ApiError extends Error {
  constructor(
    statusCode,
    message = 'something went wrong',
    errors = {},
    stack = '',
    errorCode = '',
  ) {
    super(message);

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
    message = 'unAuthorized',
    error = {},
    errorCode = 'AUTH_401',
  ) {
    return new ApiError(401, message, error, '', errorCode);
  }

  //   403 forbidden
  static forbiden(message = 'forbidden', error = {}, errorCode = 'AUTH_403') {
    return new ApiError(403, message, error, '', errorCode);
  }

  //   400 bad request
  static badrequest(
    message = 'Bad request',
    error = {},
    errorCode = 'REQ_400',
  ) {
    return new ApiError(400, message, error, '', errorCode);
  }

  //   404 not found
  static notFound(message = 'Not Found', error = {}, errorCode = 'AUTH_404') {
    return new ApiError(404, message, error, '', errorCode);
  }

  //   409 Conflict
  static conflict(message = 'Conflict', error = {}, errorCode = 'REQ_409') {
    return new ApiError(409, message, error, '', errorCode);
  }

  //   500 server error
  static serverError(
    message = 'Internal server error',
    error = {},
    errorCode = 'SERVER_500',
  ) {
    return new ApiError(500, message, error, '', errorCode);
  }

  // database error
  static db_error(
    message = 'database error',
    errors = {},
    errorCode = 'DB_500',
  ) {
    return new ApiError(500, message, errors, '', errorCode);
  }

  //   custom error
  static custom(statusCode, message = 'Conflict', error = {}, errorCode = '') {
    return new ApiError(statusCode, message, error, '', errorCode);
  }
}
export default ApiError;
