// asynchronous control flow

// 1. callbacks

const { readFile } = require("node:fs");
readFile(__filename, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content length:", data.toString());
});
