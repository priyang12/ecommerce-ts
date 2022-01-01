import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "../Login";
import "@testing-library/jest-dom";

beforeEach(() => {
  render(
    <Router>
      <Login />
    </Router>
  );
});

it("Check For onchange Input Empty Validate", () => {
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/Password/i);

  userEvent.type(email, "sdas#gmail.com");
  userEvent.type(password, "asdas");

  expect(email).toHaveValue("sdas#gmail.com");
  expect(password).toHaveValue("asdas");

  userEvent.clear(email);
  expect(screen.getByText("EMAIL is required")).toBeInTheDocument();

  userEvent.clear(password);
  expect(screen.getByText("PASSWORD is required")).toBeInTheDocument();
});

it("Input Validation on Submit", () => {
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/Password/i);

  userEvent.type(email, "sdas#gmail.com");
  userEvent.type(password, "asd");

  userEvent.click(screen.getByText(/login/));

  expect(screen.getByText("Email is not Valid")).toBeInTheDocument();
  expect(
    screen.getByText("Password Should be more than 6 Characters")
  ).toBeInTheDocument();
});
