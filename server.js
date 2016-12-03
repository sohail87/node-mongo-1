'use strict';



const http = require('http');

const hostname = 'localhost'
const port = 3001;

const server = http.createServer((request, response) => {
  response.statusCode = 200;
  response.setHeader('Content-Type','text/plain');
  response.end('Hello world!\n');

});

server.listen(port, hostname, () => {
  console.log(`Server is running at http://${hostname}:${port}`);
});
