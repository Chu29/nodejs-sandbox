// import { readFile } from "node:fs";
const { readFile } = require("node:fs");
readFile(__filename, (err, contents) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(contents.toString());
});
