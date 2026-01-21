"use strict";

import { createServer } from "http";
const PORT = process.env.PORT || 3000;

const hello = `<html>
<head>
  <style>
    body { background #333; margin: 1.25rem }
    h1 { color: #eee; font-family: sans-serif }
  </style>
</head>
<body>
  <h1>Hello World</h1>
</body>
</html>`;

const root = `<html>
<head>
  <style>
    body { background #333; margin: 1.25rem }
    a { color: yellow; font-family: sans-serif; font-size: 2rem }
  </style>
</head>
<body>
  <a href='/hello'>Hello</a>
</body>
</html>`;

// create the server
const server = createServer((req, res) => {
  res.setHeader("Content-Type", "text/html");
  res.end(hello);
});

server.listen(PORT);
