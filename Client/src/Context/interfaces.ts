import { AuthActions } from './AuthReducer';

export type AuthValues = {
  email: string;
  password: string;
};
export interface User {
  name: string;
  isAdmin: boolean;
}

export interface AuthState {
  loading: boolean;
  err: string | null;
  token: string | null;
  user: User | null;
}

export interface IContextModel {
  state: AuthState;
  dispatch: React.Dispatch<AuthActions>;
}
