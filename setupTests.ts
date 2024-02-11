export const mockedUsers = [
  {
    id: 'f84245dd-4048-48bb-834b-a0fb40f8dbb9',
    username: 'John',
    age: 25,
    hobbies: ['reading', 'gaming'],
  },
  {
    id: '6528e095-e0e6-428d-a4b2-fb0d3cac1729',
    username: 'Jane',
    age: 30,
    hobbies: ['painting'],
  },
  {
    id: '1235daab-c1d6-4952-b3e6-dfbffd1526fd',
    username: 'Mike',
    age: 35,
    hobbies: [],
  },
  {
    id: 'acb57dc3-30cc-48b9-bedf-37447ab6537b',
    username: 'Emily',
    age: 28,
    hobbies: ['cooking', 'traveling'],
  },
  {
    id: 'bea37f48-ecca-4d1a-8c87-4e0dee0151d0',
    username: 'David',
    age: 32,
    hobbies: ['photography', 'hiking'],
  },
];

jest.mock('./src/database/db', () => ({
  users: mockedUsers,
}));
