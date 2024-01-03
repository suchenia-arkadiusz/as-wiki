import { UserContext } from "../../../src/contexts/UserContext.tsx";

const MockUserContext = ({ children }: { children: React.ReactNode }) => {
  return (
    <UserContext.Provider
      value={{
        setUser: () => {},
        getUser: () => ({ username: "test", email: "test@test.com", firstName: "Test", lastName: "User", avatarUrl: "", password: "" }),
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default MockUserContext;
