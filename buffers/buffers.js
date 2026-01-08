const Buffer = require("buffer").Buffer;

// converting from string to buffer
const buffer = Buffer.from("Interviewing.io");

console.log("String to Buffer:", buffer);

// converting buffer to string
const str = buffer.toString("hex");
console.log("Buffer to string:", str);
