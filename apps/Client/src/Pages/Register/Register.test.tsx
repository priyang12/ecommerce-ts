import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

import { Wrapper } from "../../TestSetup";
import Register from "./Register";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import axios from "axios";
import { AuthProvider } from "../../Context/Authentication/AuthContext";

const mock = new MockAdapter(axios);
const History = createMemoryHistory();

const setup = () => {
  render(
    <Wrapper>
      <AuthProvider>
        <Router>
          <Register />
        </Router>
      </AuthProvider>
    </Wrapper>
  );

  const name = screen.getByLabelText(/Username/i);
  const email = screen.getByLabelText(/Email/i);
  const password = screen.getByLabelText(/Password/);
  const password2 = screen.getByLabelText(/Confirm password/i);

  return { name, email, password, password2 };
};

it("Check For User Validation on Invalid Submit", async () => {
  const { email } = setup();
  await userEvent.type(email, "asdasd");
  await userEvent.click(screen.getByText(/Register/i));
  expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Name must be between 2 and 30 characters/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Password must be at least 6 characters/)
  ).toBeInTheDocument();
});

it("Check For empty value onChange", async () => {
  const { email, name } = setup();
  await userEvent.type(name, "asdas");
  await userEvent.clear(name);
  expect(screen.getByText(/NAME is required/)).toBeInTheDocument();
  await userEvent.type(email, "asdas");
  await userEvent.click(screen.getByText(/Register/i));
  expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
});

it("Check For User's Matching Passwords", async () => {
  const { password, password2 } = setup();
  await userEvent.type(password, "123456sd");
  await userEvent.type(password2, "1566");

  await userEvent.click(screen.getByText(/Register/i));

  // Update the password
  // expect(screen.getByText(/Passwords Does not Match/)).toBeInTheDocument();

  //First We have to remove the input values or null values
  await userEvent.clear(password2);

  await userEvent.type(password2, "123456");

  await userEvent.click(screen.getByText(/Register/i));
  //Remove the error message
  expect(screen.getByText(/Confirm /)).toBeInTheDocument();
});

it("Successful Register and Redirect", async () => {
  const { email, name, password, password2 } = setup();
  const data = {
    token: "asdbsabdibaisd45asd",
  };

  mock.onPost("/api/users/register").reply(200, data);

  //Check We are on Register Page
  expect(screen.getByDisplayValue(/Register/i)).toBeInTheDocument();

  //Fill the form

  await userEvent.type(name, "priyang");
  await userEvent.type(email, "asdasio@gmail.com");
  await userEvent.type(password, "123456");
  await userEvent.type(password2, "123456");

  //Click Register
  await userEvent.click(screen.getByDisplayValue(/Register/i));

  //check for redirect
  expect(History.location.pathname).toBe("/");
});
