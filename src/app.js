import express from "express";
import { errorHandler, authLimiter } from "./middlewares/index.js";
import { CustomError } from "./utils/index.js";
import apiRoute from "./routes/v1/index.js";
import { envVar } from "./configs/env.vars.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (envVar.env === "production") {
  app.use("api/v1/auth", authLimiter);
}
app.use("/api/v1", apiRoute);

app.all("/*unknown", (req, res, next) => {
  const message = `${req.originalUrl} not found`;
  const statusCode = 404;
  const error = new CustomError(statusCode, message, true);
  next(error);
});

app.use(errorHandler.convertError);
app.use(errorHandler.handleGlobalError);

export default app;
