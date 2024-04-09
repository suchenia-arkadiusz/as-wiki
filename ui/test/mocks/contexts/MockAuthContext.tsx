import { ReactNode, useMemo } from 'react';
import { AuthContext } from '../../../src/contexts/AuthContext.tsx';
import { RegisterUser } from '../../../src/contexts/types.ts';

type Props = {
  children: ReactNode;
  checkAuth?: () => void;
  login?: (_username: string, _password: string) => void;
  register?: (_body: RegisterUser) => void;
  logout?: () => void;
};

const MockAuthContext = (props: Props) => {
  const contextValue = useMemo(() => ({
    checkAuth: props.checkAuth ? props.checkAuth : () => {},
    login: props.login ? props.login : () => {},
    register: props.register ? props.register : () => {},
    logout: props.logout ? props.logout : () => {}
  }), []);

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default MockAuthContext;
