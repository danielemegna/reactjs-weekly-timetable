import http = require('http');
import GetWeekShiftsUseCase from './src/GetWeekShiftsUseCase';

http.createServer((request, response) => {
  const {url, method} = request
  console.log(`Received ${method} on ${url}`)
  if(method == 'GET' && url == '/') {
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end('Hello, world!', 'utf-8')
    return
  }
  if(method == 'GET' && url?.startsWith('/week/')) {
    const date = url.split('/')[2]
    const shifts = GetWeekShiftsUseCase(date)
    response.writeHead(200, { 'Content-Type': 'application/javascript' })
    response.end(JSON.stringify(shifts))
    return
  }
  response.writeHead(500)
  response.end('Male!')
}).listen(8125);