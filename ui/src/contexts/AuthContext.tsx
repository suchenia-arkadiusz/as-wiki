import { createContext, type ReactNode, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useToasterContext } from './ToasterContext.tsx';
import { useRestApiContext } from './RestApiContext.tsx';
import { useUserContext } from './UserContext.tsx';
import { RegisterUser, User } from './types.ts';

type ResponseData = {
  user: User;
  jwt: string;
  refreshToken: string;
};

type Props = {
  children: ReactNode;
};

export type AuthContextType = {
  checkAuth: () => void;
  login: (_username: string, _password: string) => void;
  register: (_body: RegisterUser) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = (props: Props) => {
  const navigate = useNavigate();
  const location = useLocation();
  const api = useRestApiContext();
  const toasterContext = useToasterContext();
  const userContext = useUserContext();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    const token = localStorage.getItem('token');
    const refreshToken = localStorage.getItem('refreshToken');

    if (token || refreshToken) {
      api.get('/token').then((response) => {
        if (response.status === 401) {
          api.get('/refresh', true, { 'Refresh-Token': refreshToken || '' }).then((res) => {
            if (res.status === 401) {
              navigateToLogin();
            } else {
              res.json().then((data: ResponseData) => {
                userContext.setUser(data.user);
                localStorage.setItem('token', data.jwt);
                localStorage.setItem('refreshToken', data.refreshToken);
                navigate(location.pathname, {replace: true});
              });
            }
          });
        } else if (response.status === 200) {
          response.json().then((data: ResponseData) => {
            userContext.setUser(data.user);
          });
        }
      });
    } else {
      navigateToLogin();
    }
  };

  const navigateToLogin = () => {
    toasterContext.addToast('You need to login to access this page', 'DANGER');
    navigate('/', { state: { from: location.pathname } });
  };

  const login = async (username: string, password: string) => {
    const response = await api.post('/login', { username, password });

    if (response.status === 401) {
      toasterContext.addToast('Wrong username or password!', 'ERROR');
    }

    if (response.status === 200) {
      const data = await response.json();
      userContext.setUser(data.user);
      localStorage.setItem('token', data.jwt);
      localStorage.setItem('refreshToken', data.refreshToken);
      toasterContext.addToast('Signed in successfully!', 'SUCCESS');
      if (location.state?.from) {
        navigate(location.state.from);
        return;
      }
      navigate('/dashboard');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    userContext.setUser(undefined);
    navigate('/');
  };

  const register = async (body: RegisterUser) => {
    const response = await api.post('/register', body);

    if (response.status !== 200) {
      toasterContext.addToast('Something went wrong!', 'ERROR');
      return;
    }

    const data = await response.json();
    userContext.setUser(data.user);
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('token', data.jwt);
    localStorage.setItem('refreshToken', data.refreshToken);
    toasterContext.addToast('Signed up successfully!', 'SUCCESS');
    navigate('/dashboard');
  };

  return <AuthContext.Provider value={{checkAuth, login, register, logout}}>{props.children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }

  return context;
};
