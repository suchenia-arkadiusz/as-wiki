import { createContext, ReactNode, useContext, useMemo, useState } from "react";
import { TUser } from "./types.ts";

type Props = {
  children: ReactNode;
};

type UserContextType = {
  setUser: (user: TUser) => void;
  getUser: () => TUser | undefined;
  children?: ReactNode;
};

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = (props: Props) => {
  const [user, setUser] = useState<TUser | undefined>(undefined);

  const getUser = (): TUser | undefined => {
    return user;
  };

  const contextValue = useMemo(() => ({ setUser, getUser }), []);

  return <UserContext.Provider value={contextValue}>{props.children}</UserContext.Provider>;
};

export const useUserContext = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};
