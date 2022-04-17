import { AuthState, IContextModel } from "./interfaces";
import { createContext, useReducer } from "react";
import { AuthReducer } from "./AuthReducer";

let Token = null;
if (localStorage.token) Token = localStorage.token;

const user = sessionStorage.getItem("User");

const initialState: AuthState = {
  loading: true,
  err: null,
  token: Token,
  user: user && JSON.parse(user),
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
