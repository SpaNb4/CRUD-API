import { User } from '../models/userModel';
import * as DB from './DB';

export const getUsers = () => {
  return DB.users;
};

export const getUser = (userId: User['id']) => {
  const user = DB.users.find((user) => user.id === userId);

  if (!user) {
    return;
  }

  return user;
};

export const createUser = (newUser: User) => {
  DB.users.push(newUser);

  return newUser;
};

export const updateUser = (userId: User['id'], changes: Partial<User>) => {
  const indexForUpdate = DB.users.findIndex((user) => user.id === userId);

  if (indexForUpdate === -1) {
    return;
  }

  const updatedWorkout = {
    ...DB.users[indexForUpdate],
    ...changes,
  };

  DB.users[indexForUpdate] = updatedWorkout;

  return updatedWorkout;
};

export const deleteUser = (userId: User['id']) => {
  const indexForDeletion = DB.users.findIndex((user) => user.id === userId);

  if (indexForDeletion === -1) {
    return;
  }

  DB.users.splice(indexForDeletion, 1);
};
