import logError from "./error.logger.js";

const handleCatchError = (func) => (req, res, next) => {
  Promise.resolve(func(req, res, next)).catch((error) => {
    return next(error);
  });
};

export default handleCatchError;
