import express from "express";
import { config } from "dotenv";
import { connectDB } from "./src/db.js";

import movieRouter from "./routes/movieRoutes.js";

config();
connectDB();

const app = express(); // Initialize Express application

// Register movieRouter
app.use("/movies", movieRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});

// Handle 
