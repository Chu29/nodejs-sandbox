"use strict";
const http = require("http");
const PORT = process.env.PORT || 3000;

const helloFromServer = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <h1>Hello From Server</h1>
  </body>
</html>`;

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(helloFromServer);
});

console.log(`Server listening on PORT: ${PORT}`);
server.listen(PORT);
