import { createContext, type ReactNode, useContext, useState } from 'react';
import { type User } from './types.ts';
import { useRestApiContext } from './RestApiContext.tsx';

type Props = {
  children: ReactNode;
};

type UserContextType = {
  setUser: (_user: User | undefined) => void;
  getUser: () => User | undefined;
  updateUser: (_user: User, _currentPassword: string, _newPassword: string) => void;
  user: User | undefined;
  children?: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props: Props) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const api = useRestApiContext();

  const getUser = (): User | undefined => {
    return user;
  };

  const updateUser = (user: User, currentPassword: string, newPassword: string) => {
    api.put(`/api/v1/users/${user.id}`, {
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      currentPassword,
      newPassword
    }).then((response: Response) => {
      if (response.status === 200) {
        response.json().then((data: User) => {
          setUser(data);
        });
      }
    });
  };

  return <UserContext.Provider value={{ setUser, getUser, updateUser, user }}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }

  return context;
};
