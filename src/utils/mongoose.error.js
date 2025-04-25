const mongooseErrorHandlers = {
  ValidationError: (error) => ({
    statusCode: 400,
    message: Object.values(error.errors)
      .map((e) => e.message)
      .join(", "),
    isOperational: true,
  }),

  //Handle CastError
  CastError: (error) => ({
    statusCode: 400,
    message: `Invalid value for ${error.path}: ${error.value}`,
    isOperational: true,
  }),
};
export default mongooseErrorHandlers;
