import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controllers/userController';
import { routeNotFound } from '../utils';

export const userGet = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    userController.getUsers(request, response);
  } else if (request.url?.startsWith('/api/users/')) {
    userController.getUser(request, response);
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
