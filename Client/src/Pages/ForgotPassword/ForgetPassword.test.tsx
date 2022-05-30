import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";

//Component
import ForgotPassword from "./ForgotPassword";

import { Wrapper } from "../../TestSetup";
import { AuthProvider } from "../../Context/Authentication/AuthContext";

const mock = new MockAdapter(axios);

const Setup = () =>
  render(
    <Wrapper>
      <AuthProvider>
        <ForgotPassword />
      </AuthProvider>
    </Wrapper>
  );

it("Render Page", async () => {
  Setup();
  expect(screen.getByText(/Forgot Password/)).toBeInTheDocument();
  expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  userEvent.type(screen.getByLabelText(/Email/), "pategmail.com");
  userEvent.click(screen.getByText(/Send Recovery Mail/));

  expect(screen.getByLabelText(/Email is not Valid/)).toBeInTheDocument();
});

it("Input Email", async () => {
  mock.onPost("/api/users/recoverMail").reply(200, {
    message: "Recovery Email has been sent",
  });
  Setup();
  expect(screen.getByLabelText(/Email/)).toBeInTheDocument();
  userEvent.type(screen.getByLabelText(/Email/), "patel@gmail.com");
  userEvent.click(screen.getByText(/Send Recovery Mail/));
  await waitFor(() => {
    expect(
      screen.getByText(/Recovery Email has been sent/)
    ).toBeInTheDocument();
  });
});

it("Severe Error", async () => {
  mock.onPost("/api/users/recoverMail").reply(404, {
    msg: "Email is not Register",
  });
  Setup();
  userEvent.type(screen.getByLabelText(/Email/), "patel@gmail.com");
  userEvent.click(screen.getByText(/Send Recovery Mail/));
  await waitFor(() => {
    expect(screen.getByText(/Email is not Register/)).toBeInTheDocument();
  });
});
