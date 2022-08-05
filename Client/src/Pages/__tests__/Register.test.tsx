import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//Components: Register,Context
import Register from "../Register";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { Wrapper } from "../../TestSetup";

const setup = () => {
  render(
    <Wrapper>
      <AuthContext.Provider
        value={{
          state: {
            loading: false,
            err: null,
            token: null,
            user: null,
            alert: null,
          },
          dispatch: () => {},
        }}
      >
        <Router>
          <Register />
        </Router>
      </AuthContext.Provider>
    </Wrapper>
  );

  const name = screen.getByLabelText(/name/i);
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText("password");
  const password2 = screen.getByLabelText(/confirm password/i);

  return { name, email, password, password2 };
};

it("Check For User Validation on Invalid Submit", () => {
  const { email } = setup();
  userEvent.type(email, "asdasd");
  userEvent.click(screen.getByText(/Register/i));
  expect(screen.getByText(/Invalid email/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Name must be between 2 and 30 characters/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Password must be at least 6 characters/)
  ).toBeInTheDocument();
});

it("Check For empty value onChange", () => {
  const { email, name } = setup();
  userEvent.type(name, "asdas");
  userEvent.clear(name);
  expect(screen.getByText(/NAME is required/)).toBeInTheDocument();
  userEvent.type(email, "asdas");
  userEvent.click(screen.getByText(/Register/i));
  expect(screen.getByText(/Invalid email/)).toBeInTheDocument();
});

it("Check For User's Matching Passwords", () => {
  const { password, password2 } = setup();
  userEvent.type(password, "123456sd");
  userEvent.type(password2, "1566");

  userEvent.click(screen.getByText(/Register/i));

  // Update the password
  // expect(screen.getByText(/Passwords Does not Match/)).toBeInTheDocument();

  //First We have to remove the input values or null values
  userEvent.clear(password2);

  userEvent.type(password2, "123456");

  userEvent.click(screen.getByText(/Register/i));
  //Remove the error message
  expect(screen.getByText(/confirm /)).toBeInTheDocument();
});
