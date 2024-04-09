import { ReactNode, useMemo } from 'react';
import {RestApiContext} from '../../../src/contexts/RestApiContext.tsx';

type Props = {
  children: ReactNode;
  get: (_url: string, _withContentType?: boolean, _headers?: object) => Promise<Response>;
  post: (_url: string, _body: object, _withContentType?: boolean, _headers?: object) => Promise<Response>;
  put: (_url: string, _body: object, _withContentType?: boolean, _headers?: object) => Promise<Response>;
  del: (_url: string, _body?: object, _withContentType?: boolean, _headers?: object) => Promise<Response>;
};

const MockRestApiContext = (props: Props) => {
  const { get, post, put, del, children } = props;
  const contextValue = useMemo(() => ({
    get,
    post,
    put,
    del
  }), []);

  return <RestApiContext.Provider value={contextValue}>{children}</RestApiContext.Provider>;
};

export default MockRestApiContext;
