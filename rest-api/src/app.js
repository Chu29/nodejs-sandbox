import express from "express";
import { config } from "dotenv";
import { connectDB, disconnectDB } from "./config/db.js";

// Import Routes
import authRouter from "./modules/auth/auth.routes.js";
import watchlistRouter from "./modules/watchList/watchlist.routes.js";

config();
connectDB();

const app = express(); // Initialize Express application

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/auth", authRouter);
app.use("/watchlist", watchlistRouter);

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

/**
 * Let's handle some common edge cases that may occur and cause the application to crash or behave unexpectedly.
 */

// 1. Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// 2. Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception", err);
  server.close(async () => {
    await disconnectDB();
    process.exit(1);
  });
});

// 3. Gracefully shutdown
process.on("SIGTERM", async () => {
  console.log("SIGTERM received, shutting down gracefully");
  server.close(async () => {
    await disconnectDB();
    process.exit(0);
  });
});
