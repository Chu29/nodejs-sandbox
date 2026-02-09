import express from "express";

const app = express(); // Initialize Express application

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on localhost:${PORT}`);
});
