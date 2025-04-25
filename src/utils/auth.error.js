import CustomError from "./custom.error.js";

const authenticationErrorHandlers = {
  UnauthorizedError: () =>
    new CustomError(401, "you are not authenticated", true),
  ForbiddenError: () =>
    new CustomError(403, " you don't have permision to acccess", true),
  JsonWebTokenError: () => new CustomError(401, "Invalid token", true),
  TokenExpiredError: () => new CustomError(401, "Token Expires", true),
};

export default authenticationErrorHandlers;
