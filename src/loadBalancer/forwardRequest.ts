import http, { IncomingMessage, RequestOptions, ServerResponse } from 'node:http';
import { ErrorMessages, HttpMethod, StatusCode } from '../types';
import { sendResponse } from '../utils/utils';
import { numCPUs } from './cluster';
import { LOAD_BALANCER_PORT } from './createServer';

let currentServerIndex = 1;

export const forwardRequest = (req: IncomingMessage, res: ServerResponse) => {
  const port = LOAD_BALANCER_PORT + currentServerIndex;

  console.log(`Forwarding request to server ${currentServerIndex} on port ${port}`);

  const options: RequestOptions = {
    hostname: 'localhost',
    port,
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

  requestToServer.on('error', (err) => {
    sendResponse(res, StatusCode.INTERNAL_SERVER_ERROR, {
      message: `${ErrorMessages.InternalServerError}: ${(err as Error).message}`,
    });
  });

  if (req.method === HttpMethod.POST || req.method === HttpMethod.PUT) {
    req.pipe(requestToServer);
  } else {
    requestToServer.end();
  }

  currentServerIndex = (currentServerIndex % (numCPUs - 1)) + 1;
};
