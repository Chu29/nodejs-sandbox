import http from "node:http";
import { URL } from "node:url";

const PORT = process.env.PORT || 3000;

const server = http.createServer((request, response) => {
  request.method = "GET";
  response.setHeader("Content-Type", "text/plain");
  response.statusCode = 200;
  response.end("<h1>Hello World</h1>\n");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
