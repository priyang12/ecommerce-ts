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
  const { email, name, password, password2 } = setup();

  await userEvent.type(name, "12");
  await userEvent.type(email, "213123");
  await userEvent.type(password, "12345");
  await userEvent.type(password2, "12345");
  // since we added required on input the submit does not fire until we fill all the value
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
  const { email, name, password, password2 } = setup();
  await userEvent.type(name, "asdas");
  await userEvent.clear(name);

  await userEvent.type(email, "asdas");
  await userEvent.clear(email);

  await userEvent.type(password, "asdas");
  await userEvent.clear(password);

  await userEvent.type(password2, "asdas");
  await userEvent.clear(password2);

  await userEvent.click(screen.getByText(/Register/i));
  expect(screen.getByText(/NAME is required/)).toBeInTheDocument();
  expect(screen.getByText(/EMAIL is required/)).toBeInTheDocument();
  expect(screen.getByText(/PASSWORD is required/)).toBeInTheDocument();
  expect(screen.getByText(/PASSWORD2 is required/)).toBeInTheDocument();
});

it("Check For User's Matching Passwords", async () => {
  const { password, password2, name, email } = setup();

  await userEvent.type(name, "123456sd");
  await userEvent.type(email, "test@gmail.com");
  await userEvent.type(password, "123456");
  await userEvent.type(password2, "1566");

  await userEvent.click(screen.getByText(/Register/i));

  // Update the password
  expect(screen.getByText(/Passwords do not match/)).toBeInTheDocument();

  //First We have to remove the input values or null values
  await userEvent.clear(password2);

  await userEvent.type(password2, "123456");

  await userEvent.click(screen.getByText(/Register/i));
  //Remove the error message
  expect(screen.queryByText(/Passwords do not match /)).not.toBeInTheDocument();
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
