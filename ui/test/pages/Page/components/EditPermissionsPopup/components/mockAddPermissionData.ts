import { User, UserGroup } from '../../../../../../src/contexts/types.ts';

export const mockedUsers: Array<User> = [
  {
    id: '1',
    username: 'user1',
    email: 'test@aswiki.com'
  },
  {
    id: '2',
    username: 'user2',
    email: 'test2@aswiki.com',
    firstName: 'user',
    lastName: '2'
  }
];

export const mockedGroups: Array<UserGroup> = [
  {
    id: '3',
    name: 'Group 1'
  }
];
