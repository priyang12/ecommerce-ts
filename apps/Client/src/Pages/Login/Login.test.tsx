import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter as Router } from "react-router-dom";
import Login from ".";
import "@testing-library/jest-dom";
import { Wrapper } from "../../TestSetup";

const setup = () =>
  render(
    <Wrapper>
      <Router>
        <Login />
      </Router>
    </Wrapper>
  );

it("Check For onchange Input Empty Validate", async () => {
  setup();
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);

  await userEvent.type(email, "sdas#gmail.com");
  await userEvent.type(password, "asdas");

  expect(email).toHaveValue("sdas#gmail.com");
  expect(password).toHaveValue("asdas");

  await userEvent.clear(email);
  expect(screen.getByText("EMAIL is required")).toBeInTheDocument();

  await userEvent.clear(password);
  expect(screen.getByText("PASSWORD is required")).toBeInTheDocument();
});

it("Input Validation on Submit", async () => {
  setup();
  const email = screen.getByLabelText(/email/i);
  const password = screen.getByLabelText(/password/i);

  await userEvent.type(email, "sdas#gmail.com");
  await userEvent.type(password, "asd");

  await userEvent.click(screen.getByText(/login/));

  expect(screen.getByText("Invalid email")).toBeInTheDocument();
  expect(
    screen.getByText("Password must be at least 6 characters")
  ).toBeInTheDocument();
});
