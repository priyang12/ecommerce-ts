import React, { createContext, useReducer } from "react";
import { AuthActions, AuthReducer } from "./AuthReducer";
import { User } from "../../interfaces";

export interface IContextModel {
  state: AuthState;
  dispatch: React.Dispatch<AuthActions>;
}
interface alert {
  show: boolean;
  message: string;
  type: string;
}

export type AuthUser = Omit<User, "password" | "updatedAt" | "createdAt">;

export interface AuthState {
  loading: boolean;
  err: string | null;
  token: string | null;
  user: AuthUser | null;
  alert: alert | null;
}

let Token = null;
if (localStorage.token) Token = localStorage.token;

const user = sessionStorage.getItem("User");

const initialState: AuthState = {
  loading: false,
  err: null,
  token: Token,
  user: user && JSON.parse(user),
  alert: null,
};

export const AuthContext = createContext({} as IContextModel);

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: any }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
