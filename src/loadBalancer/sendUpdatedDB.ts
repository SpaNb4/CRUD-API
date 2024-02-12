import process from 'node:process';
import { User } from '../models/userModel';

export const sendUpdatedDB = (updatedDB: User[]) => {
  process.send?.({ type: 'updatedDB', data: updatedDB });
};
