import http, { IncomingMessage, ServerResponse } from 'http';
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
      jsonResponseWith(shifts, 200, response, request);
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

function jsonResponseWith(body: object, statusCode: number, response: ServerResponse, request: IncomingMessage) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...CORSAndCacheHeaders(request),
  })
  response.end(JSON.stringify(body));
}

function CORSAndCacheHeaders(request: IncomingMessage) {
  return {
    'Access-Control-Allow-Origin': accessControlAllowOriginFor(request),
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Cache-Control': 'must-revalidate,no-cache,no-store',
  }
}

function accessControlAllowOriginFor(request: IncomingMessage): string {
      const origin = request.headers?.origin ?? 'unknown'
      const allowedOrigins = [
        'http://localhost:3000',
        'http://md.tru.io:3000'
      ]
      return allowedOrigins.includes(origin) ? origin : ''
}