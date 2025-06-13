import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
  AuthContext,
  AuthState,
  AuthUser,
} from "../../Context/Authentication/AuthContext";
import Navbar from "./Navbar";

// Helper render function
const renderNavbar = (user: null | AuthUser = null) => {
  const dispatch = vi.fn();
  return render(
    <AuthContext.Provider
      value={{
        state: {
          user,
          loading: false,
          err: null,
          token: null,
          alert: null,
        },
        dispatch,
      }}
    >
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    </AuthContext.Provider>
  );
};

describe("Navbar Component", () => {
  it("renders logo and skip navigation", () => {
    renderNavbar();

    expect(screen.getByText(/shop it/i)).toBeInTheDocument();
    expect(screen.getByText(/skip navigation/i)).toBeInTheDocument();
  });

  it("shows Login/Register when user is not authenticated", () => {
    renderNavbar();

    expect(screen.getByText(/login\/register/i)).toBeInTheDocument();
  });

  it("shows cart and dropdown when user is authenticated", () => {
    const user = { name: "Alice" } as AuthUser;
    renderNavbar(user);

    expect(screen.getByText(/alice/i)).toBeInTheDocument();
    expect(screen.getByText(/to cart/i)).toBeInTheDocument();
  });

  it("matches snapshot for guest user", () => {
    const { container } = renderNavbar();
    expect(container).toMatchSnapshot();
  });

  it("matches snapshot for logged-in user", () => {
    const user = { name: "Alice" } as AuthUser;
    const { container } = renderNavbar(user);
    expect(container).toMatchSnapshot();
  });
});
