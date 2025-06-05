import { render, screen } from "@testing-library/react";
import { act } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import App from "./App";
import { Wrapper } from "./TestSetup";
import {
  AuthContext,
  AuthProvider,
  AuthUser,
} from "./Context/Authentication/AuthContext";
import { Products } from "./Pages/Testdata/Data";

const mock = new MockAdapter(axios);
window.scrollTo = jest.fn();

const User: AuthUser = {
  name: "test",
  email: "test@gmail.com",
  _id: "5f4b8f9f9c9d440000c0c8f9",
  isAdmin: true,
};

mock.onGet("/api/users").reply(200, User);

mock.onGet("/api/products").reply(200, {
  products: Products,
});

it("render App with login", async () => {
  await act(() => {
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
  });

  expect(screen.getByText(/SHOP IT/)).toBeInTheDocument();
});

it("render App with loadUser", async () => {
  localStorage.setItem("token", "asdasdasdasd");
  const dispatch = jest.fn();
  await act(() => {
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
  });

  // dispatch should be called
  expect(dispatch).toHaveBeenCalled();
});

it("Render Without Login", async () => {
  await act(() => {
    render(
      <Wrapper>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Wrapper>
    );
  });
  screen.getByText("Login/Register");
});
