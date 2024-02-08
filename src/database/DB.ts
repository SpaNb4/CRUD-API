import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/userModel';

export const users: User[] = [
  {
    id: uuidv4(),
    username: 'John',
    age: 25,
    hobbies: ['reading', 'gaming'],
  },
  {
    id: uuidv4(),
    username: 'Jane',
    age: 30,
    hobbies: ['painting'],
  },
  {
    id: uuidv4(),
    username: 'Mike',
    age: 35,
    hobbies: [],
  },
  {
    id: uuidv4(),
    username: 'Emily',
    age: 28,
    hobbies: ['cooking', 'traveling'],
  },
  {
    id: uuidv4(),
    username: 'David',
    age: 32,
    hobbies: ['photography', 'hiking'],
  },
];
