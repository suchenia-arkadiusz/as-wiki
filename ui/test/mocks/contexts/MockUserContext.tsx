import { UserContext } from '../../../src/contexts/UserContext.tsx';
import React from 'react';
import { User } from '../../../src/contexts/types.ts';

type Props = {
  children: React.ReactNode;
  user?: User;
  getUser?: () => User | undefined;
  setUser?: (_user: User | undefined) => void;
  updateUser?: (_user: User, _currentPassword: string, _newPassword: string) => void;
};

const MockUserContext = (props: Props) => {
  const {children, user, getUser, setUser, updateUser} = props;

  const defaultUser = {
    id: 'userId',
    username: 'test',
    email: 'test@test.com',
    firstName: 'Test',
    lastName: 'User',
    avatarUrl: '',
    password: ''
  };

  const contextValue = {
    user: user ? user : defaultUser,
    getUser: getUser ? getUser : () => defaultUser,
    setUser: setUser ? setUser : () => {},
    updateUser: updateUser ? updateUser : () => {}
  };

  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default MockUserContext;
