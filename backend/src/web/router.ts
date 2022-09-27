import { ServerResponse } from 'http';
import moment, { Moment } from 'moment';
import 'moment/locale/it';
import togglePresence from './routes/togglePresence';
import weekRoute from './routes/week';

export type ParsedRequest = {
  method: string,
  url: string,
  requestBody: any,
  origin: string | undefined,
}

export function handleReceivedRequest( request: ParsedRequest, response: ServerResponse) {

    if(weekRoute.shouldHandle(request))
      return weekRoute.handle(request, response)

    if(togglePresence.shouldHandle(request))
      return togglePresence.handle(request, response)

    console.log('Route not found!')
    emptyResponse(404, response, request.origin)

}

export function parseDate(dateString: string): Moment {
  // TODO merge regex and moment validation
  const isValid = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(dateString)
  if (!isValid)
    throw Error(`Not valid date provided: ${dateString}`)

  return moment(dateString)
}

export function jsonResponseWith(body: object, statusCode: number, response: ServerResponse, origin?: string) {
  response.writeHead(statusCode, {
    'Content-Type': 'application/json',
    ...CORSAndCacheHeaders(origin),
  })
  response.end(JSON.stringify(body))
}

export function emptyResponse(statusCode: number, response: ServerResponse, origin?: string) {
  response.writeHead(statusCode, CORSAndCacheHeaders(origin))
  response.end()
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
