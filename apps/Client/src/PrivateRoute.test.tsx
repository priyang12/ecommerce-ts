import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  BrowserRouter,
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import PrivateOutlet from "./PrivateRoute";
import { useAuth } from "./Context/Authentication/AuthContext";

vi.mock("./Components/Spinner", () => ({
  default: () => <div>Loading Spinner</div>,
}));

vi.mock("./Context/Authentication/AuthContext", () => ({
  useAuth: vi.fn(),
}));

describe("PrivateOutlet", () => {
  const DummyProtected = () => <div>Protected Content</div>;
  const DummyLogin = () => {
    const location = useLocation();
    return (
      <>
        <div>Login Page</div>
        <div data-testid="location-display">
          {location.pathname}
          {location.search}
        </div>
      </>
    );
  };

  it("renders loading spinner when auth state is loading", () => {
    (useAuth as any).mockReturnValue({
      state: {
        loading: true,
        user: null,
      },
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route path="dashboard" element={<DummyProtected />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Loading Spinner")).toBeInTheDocument();
  });

  it("renders protected content when user is authenticated", () => {
    (useAuth as any).mockReturnValue({
      state: {
        loading: false,
        user: { _id: "123" },
      },
    });

    render(
      <MemoryRouter initialEntries={["/dashboard"]}>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route path="dashboard" element={<DummyProtected />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to login page when user is unauthenticated", () => {
    (useAuth as any).mockReturnValue({
      state: {
        loading: false,
        user: null,
      },
    });

    render(
      <MemoryRouter initialEntries={["/dashboard?filter=active"]}>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route path="dashboard" element={<DummyProtected />} />
          </Route>
          <Route path="/auth/login" element={<DummyLogin />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Login Page")).toBeInTheDocument();
  });
  it("redirects to login with correct redirectTo query param", () => {
    (useAuth as any).mockReturnValue({
      state: {
        loading: false,
        user: null,
      },
    });

    const initialPath = "/dashboard/settings";
    const initialSearch = "?tab=profile";

    render(
      <MemoryRouter initialEntries={[initialPath + initialSearch]}>
        <Routes>
          <Route element={<PrivateOutlet />}>
            <Route path="/dashboard/settings" element={<DummyProtected />} />
          </Route>
          <Route path="/auth/login" element={<DummyLogin />} />
        </Routes>
      </MemoryRouter>
    );

    // We expect the login page to be rendered
    expect(screen.getByText("Login Page")).toBeInTheDocument();

    // Check that the URL includes the correct redirectTo query
    const locationText = screen.getByTestId("location-display").textContent;

    expect(locationText).toBe(
      `/auth/login?redirectTo=${initialPath + initialSearch}`
    );
  });
});
