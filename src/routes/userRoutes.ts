import cluster from 'node:cluster';
import { IncomingMessage, ServerResponse } from 'node:http';
import * as userController from '../controllers/userController';
import { forwardRequest } from '../loadBalancer/forwardRequest';
import { routeNotFound, sendResponse } from '../utils/utils';

export const routes = (request: IncomingMessage, response: ServerResponse) => {
  try {
    switch (request.method) {
      case 'GET':
        userGet(request, response);
        break;

      case 'POST':
        userPost(request, response);
        break;

      case 'PUT':
        userPut(request, response);
        break;

      case 'DELETE':
        userDelete(request, response);
        break;

      default:
        routeNotFound(request, response);
    }
  } catch (err) {
    sendResponse(response, 500, { message: `Internal Server Error: ${(err as Error).message}` });
  }
};

export const userGet = (request: IncomingMessage, response: ServerResponse) => {
  if (process.env.MULTI && cluster.isPrimary) {
    forwardRequest(request, response);
  } else if (request.url === '/api/users') {
    userController.getUsers(request, response);
  } else if (request.url?.startsWith('/api/users/')) {
    userController.getUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};

export const userPost = (request: IncomingMessage, response: ServerResponse) => {
  if (process.env.MULTI && cluster.isPrimary) {
    forwardRequest(request, response);
  } else if (request.url === '/api/users') {
    userController.createUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};

export const userPut = (request: IncomingMessage, response: ServerResponse) => {
  if (process.env.MULTI && cluster.isPrimary) {
    forwardRequest(request, response);
  } else if (request.url?.startsWith('/api/users/')) {
    userController.updateUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};

export const userDelete = (request: IncomingMessage, response: ServerResponse) => {
  if (process.env.MULTI && cluster.isPrimary) {
    forwardRequest(request, response);
  } else if (request.url?.startsWith('/api/users/')) {
    userController.deleteUser(request, response);
  } else {
    routeNotFound(request, response);
  }
};
