import { IncomingMessage, ServerResponse } from 'http';
import * as userController from '../controllers/userController';
import { forwardRequest } from '../loadBalancer/forwardRequest';
import { routeNotFound } from '../utils/utils';

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
    response.writeHead(500, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify({ message: `Internal Server Error: ${(err as Error).message}` }));
  }
};

export const userGet = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      forwardRequest(request, response);
    } else {
      userController.getUsers(request, response);
    }
  } else if (request.url?.startsWith('/api/users/')) {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      forwardRequest(request, response);
    } else {
      userController.getUser(request, response);
    }
  } else {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      routeNotFound(request, response);
    } else {
      routeNotFound(request, response);
    }
  }
};

export const userPost = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url === '/api/users') {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      forwardRequest(request, response);
    } else {
      userController.createUser(request, response);
    }
  } else {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      routeNotFound(request, response);
    } else {
      routeNotFound(request, response);
    }
  }
};

export const userPut = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url?.startsWith('/api/users/')) {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      forwardRequest(request, response);
    } else {
      userController.updateUser(request, response);
    }
  } else {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      routeNotFound(request, response);
    } else {
      routeNotFound(request, response);
    }
  }
};

export const userDelete = (request: IncomingMessage, response: ServerResponse) => {
  if (request.url?.startsWith('/api/users/')) {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      forwardRequest(request, response);
    } else {
      userController.deleteUser(request, response);
    }
  } else {
    if (process.env.MULTI && request.socket.localPort === 4000) {
      routeNotFound(request, response);
    } else {
      routeNotFound(request, response);
    }
  }
};
