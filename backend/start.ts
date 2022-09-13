import http, { IncomingMessage, ServerResponse } from 'http';
import moment, { Moment } from 'moment';
import 'moment/locale/it'
import GetWeekShiftsUseCase from './src/GetWeekShiftsUseCase';

http.createServer((request: IncomingMessage, response: ServerResponse) => {
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
    if (url?.startsWith('/togglePresence/')) {
      switch(method) {
        case 'OPTIONS':
          emptyResponse(204, response, request)
          return
        case 'POST':
          const date = parseDate(url.split('/')[2])
          console.log('Toggling presence!', date)
          //TogglePresenceUseCase(date)
          emptyResponse(201, response, request)
          return
      }
      console.log('Method not allowed!')
      emptyResponse(405, response, request)
      return
    }

    console.log('Route not found!')
    emptyResponse(404, response, request)
  } catch (error) {
    console.log('Error during request handling!', error)
    emptyResponse(500, response, request)
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

function emptyResponse(statusCode: number, response: ServerResponse, request: IncomingMessage) {
  response.writeHead(statusCode, CORSAndCacheHeaders(request))
  response.end();
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