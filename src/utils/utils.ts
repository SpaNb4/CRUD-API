import { IncomingMessage, ServerResponse } from 'node:http';

export const routeNotFound = (request: IncomingMessage, response: ServerResponse) => {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify({ message: `${request.method} route ${request.url} not found` }));
  response.end();
};

