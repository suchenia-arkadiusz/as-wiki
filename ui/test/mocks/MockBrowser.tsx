import { UserContext } from "../../src/contexts/UserContext.tsx";
import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

type MockBrowserProps = {
  children: ReactNode;
};

const MockBrowser = (props: MockBrowserProps) => {
  const { children } = props;
  return (
    <BrowserRouter>
      <UserContext.Provider
        value={{
          setUser: () => {},
          getUser: () => ({ username: "test", email: "test@test.com", firstName: "Test", lastName: "User", avatarUrl: "", password: "" }),
        }}
      >
        {children}
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default MockBrowser;
