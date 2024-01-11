import { createContext, ReactNode, useContext, useMemo } from "react";

type Props = {
  children: ReactNode;
};

type RestAPIContextProps = {
  get: (url: string) => Promise<any>;
  post: (url: string, body: any) => Promise<any>;
  put: (url: string, body: any) => Promise<any>;
};

export const RestApiProvider = (props: Props) => {
  const baseUrl = import.meta.env.VITE_APP_API_URL;

  const get = async (url: string) => {
    return await fetch(`${baseUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  const post = async (url: string, body: any) => {
    return await fetch(`${baseUrl}${url}`, {
      method: "POST",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        Cookie: `refreshToken=${localStorage.getItem("refreshToken")}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify(body),
    });
  };

  const put = async (url: string, body: any) => {
    return await fetch(`${baseUrl}${url}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });
  };

  const contextValue = useMemo(() => ({ get, post, put }), []);
  
  return <RestApiContext.Provider value={contextValue}>{props.children}</RestApiContext.Provider>;
};

export const RestApiContext = createContext<RestAPIContextProps | undefined>(undefined);

export const useRestApiContext = () => {
  const context = useContext(RestApiContext);

  if (context === undefined) {
    throw new Error("useRestApiContext must be used within a RestApiProvider");
  }

  return context;
};
