import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MockUserContext from './contexts/MockUserContext.tsx';
import MockRecentlyViewedContext from './contexts/MockRecentlyViewedContext.tsx';
import MockProjectsContext from './contexts/MockProjectsContext.tsx';
import { RestApiProvider } from '../../src/contexts/RestApiContext.tsx';
import { ToasterProvider } from '../../src/contexts/ToasterContext.tsx';
import MockAuthContext from './contexts/MockAuthContext.tsx';
import { RegisterUser } from '../../src/contexts/types.ts';

type MockBrowserProps = {
  children: ReactNode;
  api?: {
    get: (_url: string, _headers?: object) => Promise<Response>;
    post: (_url: string, _body: object, _headers?: object) => Promise<Response>;
    put: (_url: string, _body: object, _headers?: object) => Promise<Response>;
    del: (_url: string, _body?: object, _headers?: object) => Promise<Response>;
  };
  authContextProps?: {
    checkAuth?: () => void;
    login?: (_username: string, _password: string) => void;
    register?: (_body: RegisterUser) => void;
  };
};

const MockBrowser = (props: MockBrowserProps) => {
  const { children } = props;
  return (
    <BrowserRouter>
      <ToasterProvider>
        <RestApiProvider>
          <MockUserContext>
            <MockAuthContext {...props.authContextProps}>
              <MockRecentlyViewedContext>
                <MockProjectsContext>
                  {children}
                </MockProjectsContext>
              </MockRecentlyViewedContext>
            </MockAuthContext>
          </MockUserContext>
        </RestApiProvider>
      </ToasterProvider>
    </BrowserRouter>
  );
};

export default MockBrowser;
