import http, { IncomingMessage, RequestOptions, ServerResponse } from 'node:http';
import { numCPUs } from './cluster';
import { LOAD_BALANCER_PORT } from './createServer';
import { HttpMethod, StatusCode } from '../types';
import { sendResponse } from '../utils/utils';

let currentServerIndex = 1;

export const forwardRequest = (req: IncomingMessage, res: ServerResponse) => {
  console.log('Forwarding request to server', currentServerIndex);

  const options: RequestOptions = {
    hostname: 'localhost',
    port: LOAD_BALANCER_PORT + currentServerIndex,
    path: req.url,
    method: req.method,
    headers: req.headers,
  };

  const requestToServer = http.request(options, (responseFromServer) => {
    res.writeHead(
      responseFromServer.statusCode || StatusCode.INTERNAL_SERVER_ERROR,
      responseFromServer.headers,
    );
    responseFromServer.pipe(res);
  });

  requestToServer.on('error', (error) => {
    console.error('Error forwarding request:', error);
    sendResponse(res, 500, { message: 'Server error!' });
  });

  if (req.method === HttpMethod.POST || req.method === HttpMethod.PUT) {
    req.pipe(requestToServer);
  } else {
    requestToServer.end();
  }

  currentServerIndex = (currentServerIndex % (numCPUs - 1)) + 1;
};
