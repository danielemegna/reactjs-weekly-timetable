import { ServerResponse } from "http";
import GetWeekShiftsUseCase from "../../usecases/GetWeekShiftsUseCase";
import { jsonResponseWith, parseDate, ParsedRequest } from "../router";

function handle(request: ParsedRequest, response: ServerResponse): void {
  const date = parseDate(request.url.split('/')[2])
  const shifts = GetWeekShiftsUseCase(date)
  jsonResponseWith(shifts, 200, response, request.origin)
}

function shouldHandle(r: ParsedRequest) {
  return  r.url?.startsWith('/week/') && r.method == 'GET'
}

export default {
  shouldHandle: shouldHandle, 
  handle: handle
}
