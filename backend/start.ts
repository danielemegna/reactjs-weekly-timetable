import http, { IncomingMessage, ServerResponse } from 'http';
import 'moment/locale/it';
import { emptyResponse, handleReceivedRequest, ParsedRequest } from './src/web/router';

http.createServer((request: IncomingMessage, response: ServerResponse) => {
  try {
    const { url, method, headers: { origin } } = request
    console.log(`Received ${method} on ${url}`)

    let receivedData = '';
    request.on('data', chunk => receivedData += chunk);
    request.on('end', () => {
      const requestBody = parseRequestBody(receivedData)
      const parsedRequest: ParsedRequest = {
        method: method!,
        url: url!,
        requestBody: requestBody,
        origin: origin
      }
      handleReceivedRequest(parsedRequest, response)
    });
  } catch (error) {
    console.log('Error during request handling!', error)
    emptyResponse(500, response, origin)
  }
}).listen(8125);

function parseRequestBody(receivedData: string): any {
  if(!receivedData || receivedData == '') {
    console.log('Empty request body')
    return undefined
  }

  try {
    const requestBody: any = JSON.parse(receivedData)
    console.log(`Received request body: ${JSON.stringify(requestBody)}`)
    return requestBody
  } catch(error) {
    console.log('Invalid not-empty request body', receivedData)
    return undefined
  }
}
