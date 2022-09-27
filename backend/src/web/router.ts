import { ServerResponse } from 'http';
import moment, { Moment } from 'moment';
import 'moment/locale/it';
import GetWeekShiftsUseCase from '../usecases/GetWeekShiftsUseCase';

export type ParsedRequest = {
  method: string,
  url: string,
  requestBody: string | undefined,
  origin: string | undefined,
}

export function handleReceivedRequest( request: ParsedRequest, response: ServerResponse) {
    if (request.method == 'GET' && request.url == '/') {
      response.writeHead(200, { 'Content-Type': 'text/plain' })
      response.end('Hello, world!', 'utf-8')
      return
    }

    if (request.method == 'GET' && request.url?.startsWith('/week/')) {
      const date = parseDate(request.url.split('/')[2])
      const shifts = GetWeekShiftsUseCase(date)
      jsonResponseWith(shifts, 200, response, request.origin);
      return
    }

    if (request.url?.startsWith('/togglePresence/')) {
      switch (request.method) {
        case 'OPTIONS':
          emptyResponse(204, response, request.origin)
          return
        case 'POST':
          const date = parseDate(request.url.split('/')[2])
          console.log('Toggling presence!', date)
          //TogglePresenceUseCase(date)
          emptyResponse(201, response, request.origin)
          return
      }

      console.log('Method not allowed!')
      emptyResponse(405, response, request.origin)
      return
    }

    console.log('Route not found!')
    emptyResponse(404, response, request.origin)
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

export function emptyResponse(statusCode: number, response: ServerResponse, origin?: string) {
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