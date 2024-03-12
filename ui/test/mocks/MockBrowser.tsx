import { type ReactNode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import MockUserContext from './contexts/MockUserContext.tsx';
import MockRecentlyViewedContext from './contexts/MockRecentlyViewedContext.tsx';
import MockProjectsContext from './contexts/MockProjectsContext.tsx';
import { ToasterProvider } from '../../src/contexts/ToasterContext.tsx';
import MockAuthContext from './contexts/MockAuthContext.tsx';
import { RegisterUser } from '../../src/contexts/types.ts';
import MockRestApiContext from './contexts/MockRestApiContext.tsx';

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
    logout?: () => void;
  };
  projectsContextProps?: {
    addProject: (_body: object, _onClose: () => void) => void;
    editProject: (_body: object, _onClose: () => void) => void;
  };
};

const MockBrowser = (props: MockBrowserProps) => {
  const { children } = props;
  return (
    <BrowserRouter>
      <ToasterProvider>
        <MockRestApiContext {...props.api || defaultApiHandler}>
          <MockUserContext>
            <MockAuthContext {...props.authContextProps}>
              <MockRecentlyViewedContext>
                <MockProjectsContext {...props.projectsContextProps}>
                  {children}
                </MockProjectsContext>
              </MockRecentlyViewedContext>
            </MockAuthContext>
          </MockUserContext>
        </MockRestApiContext>
      </ToasterProvider>
    </BrowserRouter>
  );
};

const defaultApiHandler = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  get: (_url: string) => Promise.resolve(new Response('{}')),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  post: (_url: string, _body: object) => Promise.resolve(new Response()),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  put: (_url: string, _body: object) => Promise.resolve(new Response()),
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  del: (_url: string) => Promise.resolve(new Response())
};

export default MockBrowser;
