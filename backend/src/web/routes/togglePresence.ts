import { ServerResponse } from "http";
import { emptyResponse, parseDate, ParsedRequest } from "../router";

function handle(request: ParsedRequest, response: ServerResponse): void {
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

function shouldHandle(r: ParsedRequest) {
  return  r.url?.startsWith('/togglePresence/')
    && ['OPTIONS', 'POST'].includes(r.method)
}

export default {
  shouldHandle: shouldHandle,
  handle: handle
}

