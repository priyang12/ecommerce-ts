import { render, screen } from "@testing-library/react";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import {
  AuthContext,
  AuthProvider,
  AuthState,
} from "../../Context/Authentication/AuthContext";
import { Wrapper } from "../../TestSetup";
import userEvent from "@testing-library/user-event";
import Auth from "./Auth";
import { vi } from "vitest";

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

it("redirects to redirectTo param when token is present", () => {
  const mockContextValue = {
    state: {
      loading: false,
      err: null,
      token: "fake-token", // triggers the redirect
    } as AuthState,
    dispatch: vi.fn(),
  };

  render(
    <AuthContext.Provider value={mockContextValue}>
      <MemoryRouter initialEntries={["/auth?redirectTo=/checkout"]}>
        <Routes>
          <Route path="/auth" element={<Auth />} />
          <Route path="/checkout" element={<div>Checkout Page</div>} />
        </Routes>
      </MemoryRouter>
    </AuthContext.Provider>
  );

  // Expect the redirect to /checkout
  expect(screen.getByText("Checkout Page")).toBeInTheDocument();
});
