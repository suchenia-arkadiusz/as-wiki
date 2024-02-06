import { createContext, type ReactNode, useContext, useState } from 'react';
import { type TUser } from './types.ts';

interface Props {
  children: ReactNode
}

interface UserContextType {
  setUser: (_user: TUser) => void
  getUser: () => TUser | undefined
  children?: ReactNode
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props: Props) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);

  const getUser = (): TUser | undefined => {
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
