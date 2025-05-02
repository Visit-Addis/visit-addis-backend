import logError from "./error.logger.js";
import CustomError from "./custom.error.js";
import handleCatchError from "./catch.error.js";
import mongooseErrorHandlers from "./mongoose.error.js";
import authenticationErrorHandlers from "./auth.error.js";
import genericErrorHandlers from "./genneric.error.js";
import pick from "./pick.js";

// Event-specific error handlers
export const eventErrorHandlers = {
  EventNotFoundError: () => new CustomError(404, 'Event not found', true),
  InvalidEventIdError: () => new CustomError(400, 'Invalid event ID format', true),
  EventValidationError: (error) => new CustomError(400, error.message, true)
};

// Combine all error handlers
export const allErrorHandlers = {
  ...mongooseErrorHandlers,
  ...eventErrorHandlers,
  // Add other error handlers if needed
};

// Export everything
export {
  logError,
  CustomError,
  handleCatchError,
  authenticationErrorHandlers,
  genericErrorHandlers,
  pick
};