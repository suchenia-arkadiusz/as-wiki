import { ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";
import MockUserContext from "./contexts/MockUserContext.tsx";
import MockRecentlyViewedContext from "./contexts/MockRecentlyViewedContext.tsx";
import MockProjectsContext from "./contexts/MockProjectsContext.tsx";
import { RestApiProvider } from "../../src/contexts/RestApiContext.tsx";
import { ToasterProvider } from "../../src/contexts/ToasterContext.tsx";

type MockBrowserProps = {
  children: ReactNode;
};

const MockBrowser = (props: MockBrowserProps) => {
  const { children } = props;
  return (
    <BrowserRouter>
      <ToasterProvider>
        <RestApiProvider>
          <MockUserContext>
            <MockRecentlyViewedContext>
              <MockProjectsContext>{children}</MockProjectsContext>
            </MockRecentlyViewedContext>
          </MockUserContext>
        </RestApiProvider>
      </ToasterProvider>
    </BrowserRouter>
  );
};

export default MockBrowser;
