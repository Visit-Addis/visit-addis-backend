import Joi from "joi";
import { CustomError, logError, pick } from "../utils/index.js";

const validate = (schema) => (req, res, next) => {
  const pickedSchema = pick(schema, ["body", "query", "params"]);
  const validSchema = Joi.object(pickedSchema);
  const validRequest = pick(req, Object.keys(pickedSchema));
  const options = {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  };
  const { value, error } = validSchema
    .prefs({ errors: { label: "key" } })
    .validate(validRequest, options);
  if (error) {
    logError(error);
    const message = error.details.map((err) => err.message).join(",");
    return next(new CustomError(400, message, true));
  }
  Object.assign(req, value);
  return next();
};
export default validate;
