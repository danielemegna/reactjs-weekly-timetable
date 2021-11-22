import http = require('http');

http.createServer((request, response) => {
  console.log(request.url)
  switch(request.url) {
    case '/': {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('Hello, world!', 'utf-8')
      break;
    }
    default: {
      response.writeHead(500)
      response.end('Male!')
      break;
    }
  }
}).listen(8125);