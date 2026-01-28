import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import { STATUS_CODES } from "node:http";

import indexRouter from "./routes/index.js";
import bicycleRouter from "./routes/bicycle.js";
import { error } from "node:console";

// create express instance
const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//register the routes
app.use("/", indexRouter);
app.use("/bicycles", bicycleRouter);

// check if the request is a GET request
app.use((req, res, next) => {
  if (req.method !== "GET") {
    next(STATUS_CODES[404]);
  }
});

// register a error handler middleware
app.use((err, req, res, next) => {
  const statusCode = err.status || 500;
  res.status(statusCode);
  res.send({
    error: {
      status: statusCode,
      message: err.message,
      stack: req.app.get("env") === "development" ? err.stack : {},
    },
  });
});

export default app;
