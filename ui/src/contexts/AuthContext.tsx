import { createContext, ReactNode, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useToasterContext } from "./ToasterContext.tsx";
import { useRestApiContext } from "./RestApiContext.tsx";
import { useUserContext } from "./UserContext.tsx";

type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  checkAuth: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = (props: Props) => {
  const navigate = useNavigate();
  const api = useRestApiContext();
  const toasterContext = useToasterContext();
  const userContext = useUserContext();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem("token");
    const refreshToken = localStorage.getItem("refreshToken");

    if (token || refreshToken) {
      api.get("/token").then((response) => {
        if (response.status === 401) {
          api.get("/refresh", { "Refresh-Token": refreshToken }).then((res) => {
            if (res.status === 401) {
              navigateToLogin();
            } else {
              res.json().then((data: any) => {
                userContext.setUser(data.user);
                localStorage.setItem("token", data.jwt);
                localStorage.setItem("refreshToken", data.refreshToken);
              });
            }
          });
        }
      });
    } else {
      navigateToLogin();
    }
  };

  const navigateToLogin = () => {
    toasterContext.addToast("You need to login to access this page", "DANGER");
    navigate("/");
  };

  const contextValue = useMemo(() => ({ checkAuth }), []);

  return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
