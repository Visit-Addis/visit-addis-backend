import { MongooseError } from "mongoose";
import {
  CustomError,
  mongooseErrorHandlers,
  genericErrorHandlers,
  authenticationErrorHandlers,
  eventErrorHandlers,
  logError,
} from "../utils/index.js";

const convertError = (error, req, res, next) => {
  if (error instanceof CustomError) {
    return next(error);
  }

  logError(error);

  // Handle Mongoose errors (including event-related DB errors)
  if (error instanceof MongooseError) {
    const handleError =
      mongooseErrorHandlers[error.name] || mongooseErrorHandlers.unknownError;
    const { statusCode, message, isOperational } = handleError(error);
    return next(new CustomError(statusCode, message, isOperational));
  }

  // Handle authentication errors
  if (error.name in authenticationErrorHandlers) {
    return next(authenticationErrorHandlers[error.name]());
  }

  // Handle event-specific errors
  if (error.name in eventErrorHandlers) {
    return next(eventErrorHandlers[error.name](error));
  }

  // Handle generic errors
  if (error.name in genericErrorHandlers) {
    return next(genericErrorHandlers[error.name]());
  }

  // Fallback to generic server error
  next(new CustomError(500, "something went wrong", true));
};

const handleGlobalError = (error, req, res, next) => {
  // Format error response consistently
  const response = {
    success: false,
    message: error.isOperational === false ? "something went wrong" : error.message,
    statusCode: error.statusCode || 500,
    // Include stack trace in development
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  };

  // Additional logging for non-operational errors
  if (!error.isOperational) {
    logError({
      name: error.name,
      message: error.message,
      stack: error.stack,
      request: {
        method: req.method,
        url: req.originalUrl,
        params: req.params,
        query: req.query,
        body: req.body
      }
    });
  }

  res.status(error.statusCode || 500).json(response);
};

export default { handleGlobalError, convertError };