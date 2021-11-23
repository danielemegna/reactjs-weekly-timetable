import http = require('http');
import moment, { Moment } from 'moment';
import 'moment/locale/it'
import GetWeekShiftsUseCase from './src/GetWeekShiftsUseCase';

http.createServer((request, response) => {
  try {
    const { url, method } = request
    console.log(`Received ${method} on ${url}`)
    if (method == 'GET' && url == '/') {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('Hello, world!', 'utf-8')
      return
    }
    if (method == 'GET' && url?.startsWith('/week/')) {
      const date = parseDate(url.split('/')[2])
      const shifts = GetWeekShiftsUseCase(date)
      response.writeHead(200, { 'Content-Type': 'application/javascript' })
      response.end(JSON.stringify(shifts))
      return
    }
    console.log('No route found')
    response.writeHead(404)
    response.end()
  } catch (error) {
    console.log('Error during request handling', error)
    response.writeHead(500)
    response.end()
  }
}).listen(8125);

function parseDate(dateString: string): Moment {
  // TODO merge regex and moment validation
  const isValid = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dateString)
  if (!isValid)
    throw Error(`Not valid date provided: ${dateString}`)

  return moment(dateString)
}
