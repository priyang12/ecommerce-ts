import { AuthState, IContextModel } from './interfaces';
import { createContext, useReducer } from 'react';
import { AuthReducer } from './AuthReducer';

let Token = null;
if (localStorage.token) Token = localStorage.token;

const initialState: AuthState = {
  loading: false,
  err: null,
  token: Token,
  user: null,
};

export const AuthContext = createContext({} as IContextModel);

export const AuthProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
