import { UserContext } from '../../../src/contexts/UserContext.tsx';
import React, { useMemo } from 'react';

const MockUserContext = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useMemo(
    () => ({
      setUser: () => {},
      getUser: () => ({ username: 'test', email: 'test@test.com', firstName: 'Test', lastName: 'User', avatarUrl: '', password: '' })
    }),
    []
  );
  return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>;
};

export default MockUserContext;
