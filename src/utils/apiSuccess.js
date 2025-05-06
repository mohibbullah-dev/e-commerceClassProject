class ApiSuccess {
  constructor(statusCode = 200, message = 'success', data = {}, meta = {}) {
    this.success = statusCode < 400;
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    this.meta = meta;
  }

  // 200 ok
  static ok(message = 'OK', data = {}, meta = {}) {
    return new ApiSuccess(200, data, message, meta);
  }

  // 201 Created
  static created(message = 'Resource Created', data = {}, meta = {}) {
    return new ApiSuccess(201, message, data, meta);
  }

  // 204 No content (rare, data will be created)
  static noContent(message = 'No Content') {
    return new ApiSuccess(204, message);
  }

  // Custom Success
  static custom(message = 'Success', statusCode, data = {}, meta = {}) {
    return new ApiSuccess(statusCode, message, data, meta);
  }
}

export default ApiSuccess;
