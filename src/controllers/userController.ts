import { IncomingMessage, ServerResponse } from 'node:http';
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

  // TODO temporary commented out
  // if (!validate(userId)) {
  //   res.statusCode = 400;
  //   res.write(`Invalid userId: ${userId}`);
  //   res.end();
  //   return;
  // }

  const user = userService.getUser(userId);

  if (user) {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.write(JSON.stringify(user));
    res.end();
  } else {
    res.statusCode = 404;
    res.write(`User with id ${userId} not found`);
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
    const { username, age, hobbies = [] } = parsedBody;

    if (!username || !age) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.write(JSON.stringify({ message: 'Request body must contain username and age' }));
      res.end();
      return;
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
    // TODO temporary commented out
    // if (!validate(userId)) {
    //   res.statusCode = 400;
    //   res.write(`Invalid userId: ${userId}`);
    //   res.end();
    //   return;
    // }

    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      const parsedBody = JSON.parse(body);
      const { username, age, hobbies = [] } = parsedBody;

      if (!username || !age) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.write(JSON.stringify({ message: 'Request body must contain username and age' }));
        res.end();
        return;
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
    res.write(`User with id ${userId} not found`);
    res.end();
  }
};

export const deleteUser = (req: IncomingMessage, res: ServerResponse) => {
  // const {
  //   params: { userId },
  // } = req;
  // if (!userId) {
  //   return;
  // }
  // userService.deleteUser(userId);
  // res.status(204).send({ status: 'OK' });
};
