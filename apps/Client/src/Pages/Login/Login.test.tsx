import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import Login from ".";
import "@testing-library/jest-dom";
import { Wrapper } from "../../TestSetup";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import axios from "axios";
import { AuthProvider } from "../../Context/Authentication/AuthContext";

const mock = new MockAdapter(axios);
const History = createMemoryHistory();

const setup = () =>
  render(
    <Wrapper>
      <AuthProvider>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </AuthProvider>
    </Wrapper>
  );

it("Check For onchange Input Empty Validate", async () => {
  setup();
  const email = screen.getByLabelText(/Email/i);
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

it("Successful login And Redirect To Home", async () => {
  const data = {
    token: "asdbsabdibaisd45asd",
  };

  mock.onPost("/api/users/login").reply(200, data);

  setup();

  await userEvent.type(
    screen.getByLabelText(/Email/i),
    "PatelPriyang95@gmail.com"
  );
  await userEvent.type(screen.getByLabelText(/password/i), "123456");
  await userEvent.click(screen.getByDisplayValue(/login/i));

  //check For Redirect
  expect(History.location.pathname).toBe("/");
});
