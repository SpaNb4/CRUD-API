import { User } from '../models/userModel';
import * as DB from './db';
import { sendUpdatedDB } from '../loadBalancer/sendUpdatedDB';

export const getUsers = () => {
  if (process.env.MULTI) {
    sendUpdatedDB(DB.users);
  }

  return DB.users;
};

export const getUser = (userId: User['id']) => {
  const user = DB.users.find((user) => user.id === userId);

  if (!user) {
    return;
  }

  if (process.env.MULTI) {
    sendUpdatedDB(DB.users);
  }

  return user;
};

export const createUser = (newUser: User) => {
  DB.users.push(newUser);

  if (process.env.MULTI) {
    sendUpdatedDB(DB.users);
  }

  return newUser;
};

export const updateUser = (userId: User['id'], changes: Partial<User>) => {
  const indexForUpdate = DB.users.findIndex((user) => user.id === userId);

  if (indexForUpdate === -1) {
    return;
  }

  const updatedUser = {
    ...DB.users[indexForUpdate],
    ...changes,
  };

  DB.users[indexForUpdate] = updatedUser;

  if (process.env.MULTI) {
    sendUpdatedDB(DB.users);
  }

  return updatedUser;
};

export const deleteUser = (userId: User['id']) => {
  const indexForDeletion = DB.users.findIndex((user) => user.id === userId);

  if (indexForDeletion === -1) {
    return;
  }

  DB.users.splice(indexForDeletion, 1);

  if (process.env.MULTI) {
    sendUpdatedDB(DB.users);
  }
};
