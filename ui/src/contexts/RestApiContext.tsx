import { createContext, type ReactNode, useContext, useMemo } from 'react';

type Props = {
  children: ReactNode;
};

type RestAPIContextType = {
  get: (_url: string, _headers?: object) => Promise<Response>;
  post: (_url: string, _body: object, _headers?: object) => Promise<Response>;
  put: (_url: string, _body: object, _headers?: object) => Promise<Response>;
  del: (_url: string, _body?: object, _headers?: object) => Promise<Response>;
};

export const RestApiContext = createContext<RestAPIContextType | undefined>(undefined);

export const RestApiProvider = (props: Props) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const get = async (url: string, headers: object = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      mode: 'cors',
      headers: getHeaders(headers)
    });
  };

  const post = async (url: string, body: object, headers: object = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: getHeaders(headers),
      body: JSON.stringify(body)
    });
  };

  const put = async (url: string, body: object, headers: object = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'PUT',
      headers: getHeaders(headers),
      body: JSON.stringify(body)
    });
  };

  const del = async (url: string, body?: object, headers: object = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: getHeaders(headers),
      body: JSON.stringify(body)
    });
  };

  const getHeaders = (headers: object) => {
    const basicHeaders = {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    };

    return { ...basicHeaders, ...headers };
  };

  const contextValue = useMemo<RestAPIContextType>(() => ({ get, post, put, del }), []);

  return <RestApiContext.Provider value={contextValue}>{props.children}</RestApiContext.Provider>;
};

export const useRestApiContext = () => {
  const context = useContext(RestApiContext);

  if (context === undefined) {
    throw new Error('useRestApiContext must be used within a RestApiProvider');
  }

  return context;
};
