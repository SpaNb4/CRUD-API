import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { User } from '../models/userModel';
import * as userService from '../services/userService';
import { StatusCode } from '../types';
import { getUserIdFromUrl, parseRequestBody, sendResponse } from '../utils/utils';

export const getUsers = (_req: IncomingMessage, res: ServerResponse) => {
  const users = userService.getUsers();

  sendResponse(res, StatusCode.OK, users);
};

export const getUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = getUserIdFromUrl(req.url);

  if (!userId) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: 'Invalid request URL' });
    return;
  }

  if (!validate(userId)) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: `Invalid userId: ${userId}` });
    return;
  }

  const user = userService.getUser(userId);

  if (user) {
    sendResponse(res, StatusCode.OK, user);
  } else {
    sendResponse(res, StatusCode.NOT_FOUND, { message: `User with id ${userId} not found` });
  }
};

export const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const requestBody = await parseRequestBody(req);
    const { username, age, hobbies } = requestBody;

    if (!username || !age || !hobbies) {
      sendResponse(res, StatusCode.BAD_REQUEST, {
        message: 'Request body must contain username, age, and hobbies',
      });
      return;
    }

    const newUser: Partial<User> = {
      username: username,
      age: age,
      hobbies: hobbies,
    };

    const createdUser = userService.createUser(newUser);

    sendResponse(res, StatusCode.OK, createdUser);
  } catch (error) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: 'Invalid request body' });
  }
};

export const updateUser = async (req: IncomingMessage, res: ServerResponse) => {
  try {
    const userId = getUserIdFromUrl(req.url);

    if (!userId) {
      sendResponse(res, StatusCode.BAD_REQUEST, { message: 'Invalid request URL' });
      return;
    }

    const user = userService.getUser(userId);

    if (!user) {
      sendResponse(res, StatusCode.NOT_FOUND, { message: `User with id ${userId} not found` });
      return;
    }

    const requestBody = await parseRequestBody(req);
    const { username, age, hobbies } = requestBody;

    if (!username || !age || !hobbies) {
      sendResponse(res, StatusCode.BAD_REQUEST, {
        message: 'Request body must contain username, age, and hobbies',
      });
      return;
    }

    const changes: Partial<User> = {
      username,
      age,
      hobbies,
    };

    const updatedUser = userService.updateUser(userId, changes);

    sendResponse(res, StatusCode.OK, updatedUser);
  } catch (error) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: 'Invalid request body' });
  }
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = getUserIdFromUrl(req.url);

  if (!userId) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: 'Invalid request URL' });
    return;
  }

  if (!validate(userId)) {
    sendResponse(res, StatusCode.BAD_REQUEST, { message: `Invalid userId: ${userId}` });
    return;
  }

  const user = userService.getUser(userId);

  if (!user) {
    sendResponse(res, StatusCode.NOT_FOUND, { message: `User with id ${userId} not found` });
    return;
  }

  userService.deleteUser(userId);

  sendResponse(res, StatusCode.OK, { message: `User ${userId} deleted successfully` });
};
