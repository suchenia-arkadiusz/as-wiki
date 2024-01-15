import { createContext, ReactNode, useContext, useMemo } from "react";

type Props = {
  children: ReactNode;
};

type RestAPIContextType = {
  get: (url: string, headers?: object) => Promise<any>;
  post: (url: string, body: any, headers?: object) => Promise<any>;
  put: (url: string, body: any, headers?: object) => Promise<any>;
};

export const RestApiContext = createContext<RestAPIContextType | undefined>(undefined);

export const RestApiProvider = (props: Props) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const get = async (url: string, headers: object = {}) => {
    return await fetch(`${baseUrl}${url}`, {
      method: "GET",
      mode: "cors",
      headers: getHeaders(headers),
    });
  };

  const post = async (url: string, body: any, headers: object = {}) => {
    return await fetch(`${baseUrl}${url}`, {
      method: "POST",
      mode: "cors",
      headers: getHeaders(headers),

      body: JSON.stringify(body),
    });
  };

  const put = async (url: string, body: any, headers: object = {}) => {
    return await fetch(`${baseUrl}${url}`, {
      method: "PUT",
      headers: getHeaders(headers),
      body,
    });
  };

  const getHeaders = (headers: object) => {
    const basicHeaders = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    };

    return { ...basicHeaders, ...headers };
  };

  const contextValue = useMemo(() => ({ get, post, put }), []);

  return <RestApiContext.Provider value={contextValue}>{props.children}</RestApiContext.Provider>;
};

export const useRestApiContext = () => {
  const context = useContext(RestApiContext);

  if (context === undefined) {
    throw new Error("useRestApiContext must be used within a RestApiProvider");
  }

  return context;
};