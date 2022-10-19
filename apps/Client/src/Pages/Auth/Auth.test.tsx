import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Auth from "./Auth";
import { AuthProvider } from "../../Context/Authentication/AuthContext";
import { Wrapper } from "../../TestSetup";

const setup = () =>
  render(
    <Wrapper>
      <AuthProvider>
        <BrowserRouter>
          <Auth />
        </BrowserRouter>
      </AuthProvider>
    </Wrapper>
  );

it("Switcher", async () => {
  setup();
  const Login = screen.getByText(/Login/) as HTMLButtonElement;
  const Register = screen.getByText(/Register/) as HTMLButtonElement;

  expect(window.location.pathname).toMatch("/");

  await userEvent.click(Login);

  expect(window.location.pathname).toMatch("/login");

  await userEvent.click(Register);

  expect(window.location.pathname).toMatch("/register");
});
