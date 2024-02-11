import { v4 as uuidv4 } from 'uuid';
import * as userOperations from '../database/userOperations';
import { User, UserWithoutId } from '../models/userModel';

export const getUsers = () => {
  const users = userOperations.getUsers();
  return users;
};

export const getUser = (userId: User['id']) => {
  const user = userOperations.getUser(userId);
  return user;
};

export const createUser = (newUser: UserWithoutId) => {
  const userInsert = {
    id: uuidv4(),
    ...newUser,
  };

  const createdUser = userOperations.createUser(userInsert);
  return createdUser;
};

export const updateUser = (userId: User['id'], changes: Partial<User>) => {
  const updatedUser = userOperations.updateUser(userId, changes);
  return updatedUser;
};

export const deleteUser = (userId: User['id']) => {
  userOperations.deleteUser(userId);
};
