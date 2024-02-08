import { IncomingMessage, ServerResponse } from 'node:http';
import { validate } from 'uuid';
import { User } from '../models/userModel';
import * as userService from '../services/userService';

export const getUsers = (_req: IncomingMessage, res: ServerResponse) => {
  const users = userService.getUsers();

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.write(JSON.stringify(users));
  res.end();
};

export const getUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url!.split('/')[3];

  if (!validate(userId)) {
    res.statusCode = 400;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: `Invalid userId: ${userId}` }));
    res.end();
  }

  const user = userService.getUser(userId);

  if (user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(user));
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: `User with id ${userId} not found` }));
    res.end();
  }
};

export const createUser = (req: IncomingMessage, res: ServerResponse) => {
  let body = '';

  req.on('data', (chunk) => {
    body += chunk;
  });

  req.on('end', () => {
    const parsedBody = JSON.parse(body);
    const { username, age, hobbies } = parsedBody;

    if (!username || !age || !hobbies) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: 'Request body must contain username, age, and hobbies' }));
      res.end();
    }

    const newUser: Partial<User> = {
      username: username,
      age: age,
      hobbies: hobbies,
    };

    const createdUser = userService.createUser(newUser);

    res.statusCode = 201;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(createdUser));
    res.end();
  });
};

export const updateUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url!.split('/')[3];

  if (userService.getUser(userId)) {
    if (!validate(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: `Invalid userId: ${userId}` }));
      res.end();
    }

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const { username, age, hobbies } = parsedBody;

      if (!username || !age || !hobbies) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'Request body must contain username, age, and hobbies' }));
        res.end();
      }

      const changes: Partial<User> = {
        username: username,
        age: age,
        hobbies: hobbies,
      };

      const updatedUser = userService.updateUser(userId, changes);

      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify(updatedUser));
      res.end();
    });
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: `User with id ${userId} not found` }));
    res.end();
  }
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  const userId = req.url!.split('/')[3];

  if (userService.getUser(userId)) {
    if (!validate(userId)) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: `Invalid userId: ${userId}` }));
      res.end();
    }

    userService.deleteUser(userId);

    res.statusCode = 204;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: `User ${userId} deleted successfully` }));
    res.end();
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify({ message: `User with id ${userId} not found` }));
    res.end();
  }
};
