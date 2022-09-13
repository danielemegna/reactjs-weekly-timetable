import http, { IncomingMessage, ServerResponse } from 'http';
import moment, { Moment } from 'moment';
import 'moment/locale/it'
import GetWeekShiftsUseCase from './src/usecases/GetWeekShiftsUseCase';

http.createServer((request: IncomingMessage, response: ServerResponse) => {
  try {
    const { url, method, headers: { origin } } = request
    console.log(`Received ${method} on ${url}`)

    let receivedData = '';
    request.on('data', chunk => receivedData += chunk);
    request.on('end', () => {
      const requestBody = parseRequestBody(receivedData)
      console.log(requestBody) // TODO
    });

    if (method == 'GET' && url == '/') {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('Hello, world!', 'utf-8')
      return
    }
    if (method == 'GET' && url?.startsWith('/week/')) {
      const date = parseDate(url.split('/')[2])
      const shifts = GetWeekShiftsUseCase(date)
      jsonResponseWith(shifts, 200, response, origin);
      return
    }
    if (url?.startsWith('/togglePresence/')) {
      switch (method) {
        case 'OPTIONS':
          emptyResponse(204, response, origin)
          return
        case 'POST':
          const date = parseDate(url.split('/')[2])
          console.log('Toggling presence!', date)
          //TogglePresenceUseCase(date)
          emptyResponse(201, response, origin)
          return
      }
      console.log('Method not allowed!')
      emptyResponse(405, response, origin)
      return
    }

    console.log('Route not found!')
    emptyResponse(404, response, origin)
  } catch (error) {
    console.log('Error during request handling!', error)
    emptyResponse(500, response, origin)
  }
}).listen(8125);

function parseRequestBody(receivedData: string): string | undefined {
  if(!receivedData || receivedData == '') {
    console.log('Empty request body')
    return undefined
  }

  try {
    const requestBody = JSON.parse(receivedData)
    console.log(`Received request body: ${JSON.stringify(requestBody)}`)
  } catch(error) {
    console.log('Invalid request body')
    return undefined
  }
}

function parseDate(dateString: string): Moment {
  // TODO merge regex and moment validation
  const isValid = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dateString)
  if (!isValid)
    throw Error(`Not valid date provided: ${dateString}`)

  return moment(dateString)
}

function jsonResponseWith(body: object, statusCode: number, response: ServerResponse, origin?: string) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...CORSAndCacheHeaders(origin),
  })
  response.end(JSON.stringify(body));
}

function emptyResponse(statusCode: number, response: ServerResponse, origin?: string) {
  response.writeHead(statusCode, CORSAndCacheHeaders(origin))
  response.end();
}

function CORSAndCacheHeaders(origin?: string) {
  const allowedOrigins = [
    'http://localhost:3000',
    'http://md.tru.io:3000'
  ]
  const isOriginAllowed = origin ? allowedOrigins.includes(origin) : false
  return {
    'Access-Control-Allow-Origin': isOriginAllowed ? origin : '',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Cache-Control': 'must-revalidate,no-cache,no-store',
  }
}
