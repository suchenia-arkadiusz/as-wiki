import { createContext, ReactNode, useState } from "react";
import { TUser } from "./types.ts";

type UserContextProps = {
  children: ReactNode;
};

type TUserContext = {
  setUser: (user: TUser) => void;
  getUser: () => TUser | undefined;
  children?: ReactNode;
};

export const UserController = (props: UserContextProps) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);

  const getUser = (): TUser | undefined => {
    return user;
  };

  return <UserContext.Provider value={{ setUser, getUser }}>{props.children}</UserContext.Provider>;
};

export const UserContext = createContext<TUserContext | undefined>(undefined);
