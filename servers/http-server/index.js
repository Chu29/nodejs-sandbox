"use strict";
import { createServer, STATUS_CODES } from "http";
import url from "node:url";
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

const root = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>
    <a href="/hello">Home Page</a>
  </body>
</html>`;

const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  if (req.method !== "GET") {
    res.statusCode = 405;
    res.end(STATUS_CODES[res.statusCode] + "\r\n");
    return;
  }

  const { pathname } = url.parse(req.url);
  //check if the route is / then return the root
  if (pathname === "/") {
    res.end(root);
    return;
  }
  //check if the route is /hello then return the helloFromServer
  if (pathname === "/hello") {
    res.end(helloFromServer);
    return;
  }

  //if the route is not / or /hello then return 404
  res.statusCode = 404;
  res.end(STATUS_CODES[res.statusCode] + "\r\n");
});

console.log(`Server listening on PORT: http://localhost:${PORT}`);
server.listen(PORT);
