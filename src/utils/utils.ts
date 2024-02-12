import { IncomingMessage, ServerResponse } from 'node:http';
import { User } from '../models/userModel';
import { ErrorMessages, StatusCode } from '../types';

export const routeNotFound = (request: IncomingMessage, response: ServerResponse) => {
  response.statusCode = 404;
  response.setHeader('Content-Type', 'application/json');
  response.write(JSON.stringify({ message: `${request.method} route ${request.url} not found` }));
  response.end();
};

export const sendResponse = (res: ServerResponse, statusCode: StatusCode, data: unknown) => {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' });
  res.write(JSON.stringify(data));
  res.end();
};

export const parseRequestBody = (req: IncomingMessage): Promise<User> => {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);

        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
  });
};

export const getUserIdFromUrl = (url?: string) => {
  return url?.split('/')[3] || null;
};

export const isFieldsValid = (username: string, age: number, hobbies: string[], res: ServerResponse) => {
  if (!username || !age || !hobbies) {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessages.MissingFields,
    });
    return false;
  }

  if (typeof username !== 'string' || !username.trim()) {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessages.InvalidUsername,
    });
    return false;
  }

  if (typeof age !== 'number') {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessages.InvalidAge,
    });
    return false;
  }

  if (!Array.isArray(hobbies) || !hobbies.every((hobby) => typeof hobby === 'string')) {
    sendResponse(res, StatusCode.BAD_REQUEST, {
      message: ErrorMessages.InvalidHobbies,
    });
    return false;
  }

  return true;
};
