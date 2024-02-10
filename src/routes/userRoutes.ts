import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controllers/userController';
import { routeNotFound } from '../utils';

export const userGet = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    userController.getUsers(request, response);
  } else if (request.url?.startsWith('/api/users/')) {
    userController.getUser(request, response);
  } else if (request.url?.startsWith('/api/heavy')) {
    let total = 0;
    for (let i = 0; i < 20_000_000; i++) {
      total++;
    }
    response.statusCode = 200;
    response.setHeader('Content-Type', 'application/json');
    response.write(`The result of the CPU intensive task is ${total}\n`);
    response.end();
  } else {
    routeNotFound(request, response);
  }
};

export const userPost = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    userController.createUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};

export const userPut = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url?.startsWith('/api/users/')) {
    userController.updateUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};

export const userDelete = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url?.startsWith('/api/users/')) {
    userController.deleteUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};
