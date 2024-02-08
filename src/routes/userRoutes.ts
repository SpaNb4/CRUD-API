import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controllers/userController';

export const userGet = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    userController.getUsers(request, response);
  } else if (request.url?.startsWith('/api/users/')) {
    userController.getUser(request, response);
  } else {
    response.statusCode = 400;
    response.write(`CANNOT GET ${request.url}`);
    response.end();
  }
};

export const userPost = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    userController.createUser(request, response);
  } else {
    response.statusCode = 400;
    response.write(`CANNOT POST ${request.url}`);
    response.end();
  }
};

export const userPut = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url?.startsWith('/api/users/')) {
    userController.updateUser(request, response);
  } else {
    response.statusCode = 400;
    response.write(`CANNOT PUT ${request.url}`);
    response.end();
  }
};
