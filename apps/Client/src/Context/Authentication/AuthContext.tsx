import React, { createContext, useEffect, useReducer } from "react";
import { AuthActions, AuthReducer } from "./AuthReducer";
import { loadUser } from "./AuthActions";
import setAuthToken from "../../Utils/setAuthToken";
import { LOAD_USER, LOG_OUT, SetAuth } from "./AuthTypes";
import type { User } from "../../Types/interfaces";

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

const initialState: AuthState = {
  loading: false,
  err: null,
  token: null,
  user: null,
  alert: null,
};

export const AuthContext = createContext({} as IContextModel);
AuthContext.displayName = "AuthContext";

export const useAuth = () => {
  if (!AuthContext) throw new Error("useAuth must be used within AuthProvider");
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  useEffect(() => {
    (async () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = sessionStorage.getItem("User");
      try {
        if (storedToken) {
          setAuthToken(storedToken);
          dispatch({
            type: SetAuth,
            payload: storedToken,
          });

          if (storedUser === null) {
            await loadUser(storedToken, dispatch);
          } else {
            const userData: AuthUser = JSON.parse(storedUser);
            dispatch({
              type: LOAD_USER,
              payload: userData,
            });
          }
        }
      } catch {
        dispatch({
          type: LOG_OUT,
          payload: null,
        });
        setAuthToken(null);
      }
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
