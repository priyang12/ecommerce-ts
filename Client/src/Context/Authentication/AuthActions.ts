import {
  LOGIN_SUCCESS,
  AUTH_ERROR,
  LOAD_USER,
  SET_LOADING,
  LOG_OUT,
  UPDATE_USER,
  MailSEND_SUCCESS,
  RESET_PASSWORD_SUCCESS,
} from "./Authtypes";

import axios, { AxiosError } from "axios";
import { AuthActions } from "./AuthReducer";
import React from "react";

export const loadUser = async (
  token: any,
  dispatch: React.Dispatch<AuthActions>
) => {
  if (token) {
    try {
      setLoading(dispatch);
      const { data }: any = await axios.get("/api/users");
      sessionStorage.setItem("User", JSON.stringify(data));
      dispatch({
        type: LOAD_USER,
        payload: data,
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
  }
};
export const LoginUser = async (
  user: any,
  dispatch: React.Dispatch<AuthActions>
) => {
  try {
    setLoading(dispatch);
    const { data }: any = await axios.post("/api/users/login", user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.token,
    });
    localStorage.setItem("token", data.token);

    loadUser(data.token, dispatch);
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
    const { data }: any = await axios.post("/api/users/register", user);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.token,
    });
    localStorage.setItem("token", data.token);

    loadUser(data.token, dispatch);
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
    console.log(err);
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
  user: any
) => {
  try {
    setLoading(dispatch);
    const { data }: any = await axios.patch("/api/users/resetpassword", {
      user,
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
    setLoading(dispatch);
    localStorage.clear();
    sessionStorage.clear();
    dispatch({
      type: LOG_OUT,
      payload: null,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
      payload: "Server Error Reload ",
    });
  }
};
export const setLoading = (dispatch: React.Dispatch<AuthActions>) => {
  dispatch({
    type: SET_LOADING,
    payload: true,
  });
};

export const StopLoading = (dispatch: React.Dispatch<AuthActions>) => {
  dispatch({
    type: SET_LOADING,
    payload: false,
  });
};
