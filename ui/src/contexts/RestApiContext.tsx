import { createContext, type ReactNode, useContext, useMemo } from 'react';

type Props = {
  children: ReactNode;
};

type RestAPIContextType = {
  get: (_url: string, _withContentType?: boolean, _headers?: Record<string, string>) => Promise<Response>;
  post: (_url: string, _body: object, _withContentType?: boolean, _headers?: Record<string, string>) => Promise<Response>;
  put: (_url: string, _body: object, _withContentType?: boolean, _headers?: Record<string, string>) => Promise<Response>;
  del: (_url: string, _body?: object, _withContentType?: boolean, _headers?: Record<string, string>) => Promise<Response>;
};

export const RestApiContext = createContext<RestAPIContextType | undefined>(undefined);

export const RestApiProvider = (props: Props) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const get = async (url: string, withContentType: boolean = true, headers: Record<string, string> = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'GET',
      mode: 'cors',
      headers: getHeaders(headers, withContentType)
    });
  };

  const post = async (url: string, body: object, withContentType: boolean = true, headers: Record<string, string> = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'POST',
      mode: 'cors',
      headers: getHeaders(headers, withContentType),
      body: withContentType ? JSON.stringify(body) : body as FormData
    });
  };

  const put = async (url: string, body: object, withContentType: boolean = true, headers: Record<string, string> = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'PUT',
      headers: getHeaders(headers, withContentType),
      body: JSON.stringify(body)
    });
  };

  const del = async (url: string, body?: object, withContentType: boolean = true, headers: Record<string, string> = {}): Promise<Response> => {
    return await fetch(`${baseUrl}${url}`, {
      method: 'DELETE',
      headers: getHeaders(headers, withContentType),
      body: JSON.stringify(body)
    });
  };

  const getHeaders = (headers: object, withContentType: boolean) => {
    const basicHeaders: Record<string, string> = {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    };

    if (withContentType) {
      basicHeaders['Content-Type'] = 'application/json';
    }

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
