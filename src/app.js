import express from "express";
import cors from "cors";
import morgan from "morgan";
import MongoStore from "connect-mongo";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./configs/passport.js";
import { errorHandler, authLimiter } from "./middlewares/index.js";
import { CustomError } from "./utils/index.js";
import apiRoute from "./routes/v1/index.js";
import { envVar } from "./configs/env.vars.js";

const app = express();
const express = require('express');
const eventRoutes = require('./routes/event.route');

// Other middleware and configurations...

// Register event routes
app.use('/api/v1/events', eventRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});


module.exports = app;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  session({
    secret: envVar.session.secret,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: envVar.env === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: "strict",
    },
    store: MongoStore.create({
      mongoUrl: envVar.dataBaseUrl,
      dbName: "hiluftesfay",
      collectionName: "sessions",
      ttl: 24 * 60 * 60,
    }),
  })
);

app.use(passport.initialize());
app.use(passport.session());

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
