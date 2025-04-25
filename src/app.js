import express from "express";
import { errorHandler } from "./middlewares/index.js";
import { CustomError } from "./utils/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("/*unknown", (req, res, next) => {
  const message = `${req.originalUrl} not found`;
  const statusCode = 404;
  const error = new CustomError(statusCode, message, true);
  next(error);
});

app.use(errorHandler.convertError);
app.use(errorHandler.handleGlobalError);

export default app;
