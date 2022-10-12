import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import ResetPassword from "./ResetPassword";
import { AuthProvider } from "../../Context/Authentication/AuthContext";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const route = "/ResetPassword/123123";
const history = createMemoryHistory({ initialEntries: [route] });
const mock = new MockAdapter(axios);

const setup = () =>
  render(
    <Router history={history}>
      <Route path="/ResetPassword/:id">
        <AuthProvider>
          <ResetPassword />
        </AuthProvider>
      </Route>
    </Router>
  );

it("Render ResetPassword with valid token", async () => {
  const User = {
    id: "123123",
    name: "Test User",
    email: "asd@gmail.com",
  };

  mock.onGet("/api/users").reply(200, { User });
  mock.onPatch("/api/users/resetpassword").reply(200, {
    message: "Password Reset Successfully",
  });
  setup();

  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  expect(screen.getByText(/Reset Password/)).toBeInTheDocument();

  const password = screen.getByLabelText(/Password/) as HTMLInputElement;
  const passwordConfirm = screen.getByLabelText(
    /Confirm password/
  ) as HTMLInputElement;

  userEvent.type(password, "1223");
  userEvent.type(passwordConfirm, "12311");

  userEvent.click(screen.getByText("Reset"));
  expect(screen.getByText(/more than 6 Characters/)).toBeInTheDocument();
  expect(screen.getByText(/Confirm Password do not match/)).toBeInTheDocument();

  userEvent.clear(password);
  userEvent.clear(passwordConfirm);

  userEvent.type(password, "123123");
  userEvent.type(passwordConfirm, "123123");

  userEvent.click(screen.getByText("Reset"));

  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));

  expect(screen.getByText(/Password Reset Successfully/)).toBeInTheDocument();
});

it("Invalid Token", async () => {
  mock.onGet("/api/users").reply(401, { msg: "Invalid Token" });

  setup();

  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));

  expect(screen.getByText(/Invalid Token/)).toBeInTheDocument();
});
