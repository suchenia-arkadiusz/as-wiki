import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import MockUserContext from "./contexts/MockUserContext.tsx";
import MockRecentlyViewedContext from "./contexts/MockRecentlyViewedContext.tsx";
import MockProjectsContext from "./contexts/MockProjectsContext.tsx";

type MockBrowserProps = {
  children: ReactNode;
};

const MockBrowser = (props: MockBrowserProps) => {
  const { children } = props;
  return (
    <BrowserRouter>
      <MockUserContext>
        <MockRecentlyViewedContext>
          <MockProjectsContext>{children}</MockProjectsContext>
        </MockRecentlyViewedContext>
      </MockUserContext>
    </BrowserRouter>
  );
};

export default MockBrowser;
