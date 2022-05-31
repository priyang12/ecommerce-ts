import { render, screen } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";
import { User } from "./Context/Authentication/interfaces";
import { Wrapper } from "./TestSetup";

import {
  AuthContext,
  AuthProvider,
} from "./Context/Authentication/AuthContext";
const mock = new MockAdapter(axios);
window.scrollTo = jest.fn();

it("render App with login", () => {
  const User: User = {
    name: "test",
    email: "test@gmail.com",
    _id: "5f4b8f9f9c9d440000c0c8f9",
    createdAt: "2020-05-06T13:52:56.859Z",
    isAdmin: true,
  };
  render(
    <Wrapper>
      <AuthContext.Provider
        value={{
          state: {
            token: "asdasdasdasd",
            user: User,
            alert: null,
            loading: false,
            err: null,
          },
          dispatch: jest.fn(),
        }}
      >
        <App />
      </AuthContext.Provider>
    </Wrapper>
  );

  screen.getByText(/SHOP IT/);
});

it("render App with loadUser", async () => {
  mock.onGet("/api/users").reply(200, {
    user: {
      name: "test",
      email: "test@gmail.com",
      _id: "5f4b8f9f9c9d440000c0c8f9",
    },
  });
  localStorage.setItem("token", "asdaaasdasasdsdasdasd");
  const dispatch = jest.fn();
  render(
    <Wrapper>
      <AuthContext.Provider
        value={{
          state: {
            token: "asdasdasdasd",
            user: null,
            alert: null,
            loading: false,
            err: null,
          },
          dispatch,
        }}
      >
        <App />
      </AuthContext.Provider>
    </Wrapper>
  );

  // dispatch should be called
  expect(dispatch).toHaveBeenCalled();
});

it("Render Without Login", () => {
  render(
    <Wrapper>
      <AuthProvider>
        <App />
      </AuthProvider>
    </Wrapper>
  );
  screen.getByText("Login/Register");
});
