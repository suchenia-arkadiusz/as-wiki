import { createContext, type ReactNode, useContext, useState } from 'react';
import { type User } from './types.ts';

type Props = {
  children: ReactNode;
};

type UserContextType = {
  setUser: (_user: User | undefined) => void;
  getUser: () => User | undefined;
  children?: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const getUser = (): User | undefined => {
    return user;
  };

  return <UserContext.Provider value={{ setUser, getUser }}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
