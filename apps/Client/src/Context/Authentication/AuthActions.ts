import React from "react";
import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  SET_LOADING,
  LOG_OUT,
  UPDATE_USER,
  MailSEND_SUCCESS,
  RESET_PASSWORD_SUCCESS,
  LOAD_USER,
} from "./Authtypes";

import axios, { AxiosError } from "axios";
import setAuthToken from "../../Utils/setAuthToken";
import { AuthActions } from "./AuthReducer";
import type { User } from "../../Types/interfaces";

export const loadUser = async (
  token: any,
  dispatch: React.Dispatch<AuthActions>
) => {
  if (token) {
    setAuthToken(token);
    try {
      setLoading(dispatch);
      const { data }: { data: User } = await axios.get("/api/users");
      const { password, createdAt, updatedAt, ...authUser } = data;

      dispatch({
        type: LOAD_USER,
        payload: authUser,
      });

      sessionStorage.setItem("User", JSON.stringify(authUser));
      stopLoading(dispatch);
    } catch (err: any | AxiosError) {
      let ErrorMessage = "Server Error Try Again Later";
      if (err as AxiosError) {
        ErrorMessage = err.response.data?.msg;
      }
      Logout(dispatch);
      dispatch({
        type: AUTH_ERROR,
        payload: ErrorMessage,
      });
    }
  }
};
export const LoginUser = async (
  user: any,
  dispatch: React.Dispatch<AuthActions>
) => {
  try {
    setLoading(dispatch);
    const { data } = await axios.post("/api/users/login", user);
    if (data.token) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });
      localStorage.setItem("token", data.token);

      await loadUser(data.token, dispatch);
    }
  } catch (err: any | AxiosError) {
    let ErrorMessage = "Server Error Try Again Later";
    if (err as AxiosError) {
      ErrorMessage = err.response?.data?.msg;
    }

    dispatch({
      type: AUTH_ERROR,
      payload: ErrorMessage,
    });
  }
};
export const RegisterUser = async (
  user: any,
  dispatch: React.Dispatch<AuthActions>
) => {
  try {
    setLoading(dispatch);
    const { data } = await axios.post("/api/users/register", user);
    if (data.toke) {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.token,
      });
      localStorage.setItem("token", data.token);
    }
    await loadUser(data.token, dispatch);
  } catch (err: any | AxiosError) {
    let ErrorMessage = "Server Error Try Again Later";
    if (err as AxiosError) {
      ErrorMessage = err.response.data?.msg;
    }
    dispatch({
      type: AUTH_ERROR,
      payload: ErrorMessage,
    });
  }
};

export const UpdateUser = async (
  dispatch: React.Dispatch<AuthActions>,
  user: any
) => {
  try {
    setLoading(dispatch);
    const { data }: any = await axios.put("/api/users/update", user);
    dispatch({
      type: UPDATE_USER,
      payload: data,
    });
  } catch (err: any | AxiosError) {
    let ErrorMessage = "Server Error Try Again Later";
    if (err as AxiosError) {
      ErrorMessage = err.response.data.message;
    }
    dispatch({
      type: AUTH_ERROR,
      payload: ErrorMessage,
    });
  }
};

export const UpdatePassword = async (
  dispatch: React.Dispatch<AuthActions>,
  password: any,
  password2: any
) => {
  try {
    setLoading(dispatch);
    const { data }: any = await axios.patch("/api/users/resetpassword", {
      password,
      password2,
    });
    dispatch({
      type: RESET_PASSWORD_SUCCESS,
      payload: data.message,
    });
  } catch (err: any | AxiosError) {
    let ErrorMessage = "Server Error Try Again Later";

    if (err as AxiosError) {
      ErrorMessage = err.response?.data?.msg;
    }
    dispatch({
      type: AUTH_ERROR,
      payload: ErrorMessage,
    });
  }
};

export const RecoverPassword = async (
  dispatch: React.Dispatch<AuthActions>,
  email: string
) => {
  try {
    setLoading(dispatch);
    const { data }: any = await axios.post("/api/users/recoverMail", { email });
    dispatch({
      type: MailSEND_SUCCESS,
      payload: data.message,
    });
  } catch (err: any | AxiosError) {
    let ErrorMessage = "Server Error Try Again Later";

    if (err as AxiosError) {
      ErrorMessage = err.response.data?.msg;
    }
    dispatch({
      type: AUTH_ERROR,
      payload: ErrorMessage,
    });
  }
};

export const Logout = (dispatch: React.Dispatch<AuthActions>) => {
  try {
    localStorage.clear();
    sessionStorage.clear();
    dispatch({
      type: LOG_OUT,
      payload: null,
    });
    setAuthToken(null);
  } catch {
    dispatch({
      type: AUTH_ERROR,
      payload: "Server Error Reload",
    });
  }
};
export const setLoading = (dispatch: React.Dispatch<AuthActions>) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
};

export const stopLoading = (dispatch: React.Dispatch<AuthActions>) => {
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
