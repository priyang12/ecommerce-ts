import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOAD_USER,
  SET_LOADING,
  LOG_OUT,
} from './Authtypes';

import { AuthState, User } from './interfaces';

type AuthPayload = {
  [LOGIN_SUCCESS]: string | null;
  [AUTH_ERROR]: string | null;
  [LOAD_USER]: User | null;
  [SET_LOADING]: User | null;
  [LOG_OUT]: null;
};

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export const AuthReducer = (state: AuthState, action: AuthActions) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: action.payload,
        loading: false,
      };
    case LOAD_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
        err: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
        loading: false,
        err: null,
      };
  }
};
