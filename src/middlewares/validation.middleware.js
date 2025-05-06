import { z, ZodError } from 'zod';
import ApiError from '../utils/apiError.js';
function ValidationMiddleware(schema) {
  return async (req, res, next) => {
    try {
      const validatedData = schema.parse(req.body);
      req.body = validatedData;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const formatedError = error.errors.map((err) => ({
          feild: err.path[0],
          message: err.message,
        }));
        throw ApiError.badrequest('validation error', formatedError);
      } else {
        throw ApiError.serverError(error.message);
      }
    }
  };
}

export default ValidationMiddleware;
