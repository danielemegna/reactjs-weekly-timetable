import http, { IncomingMessage, ServerResponse } from 'http';
import 'moment/locale/it';
import { emptyResponse, handleReceivedRequest } from './src/web/router';

http.createServer((request: IncomingMessage, response: ServerResponse) => {
  try {
    const { url, method, headers: { origin } } = request
    console.log(`Received ${method} on ${url}`)

    let receivedData = '';
    request.on('data', chunk => receivedData += chunk);
    request.on('end', () => {
      const requestBody = parseRequestBody(receivedData)
      handleReceivedRequest(method, url, requestBody, origin, response)
    });
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
    return requestBody
  } catch(error) {
    console.log('Invalid request body')
    return undefined
  }
}

