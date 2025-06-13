import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import DropDown from "./DropDown";
import { vi } from "vitest";
import type { AuthUser } from "../../../Context/Authentication/AuthContext";

const mockUser = {
  name: "John Doe",
} as AuthUser;

const RouteWrapper = ({ children }: { children: React.ReactNode }) => {
  return <Router>{children}</Router>;
};

describe("DropDown", () => {
  it("renders username", () => {
    render(
      <RouteWrapper>
        <DropDown user={mockUser} onLogout={vi.fn()} />
      </RouteWrapper>
    );
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
  });

  it("shows dropdown when button is clicked", () => {
    render(
      <RouteWrapper>
        <DropDown user={mockUser} onLogout={vi.fn()} />
      </RouteWrapper>
    );
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getByText(/profile/i)).toBeInTheDocument();
  });

  it("calls onLogout when logout is clicked", () => {
    const onLogout = vi.fn();
    render(
      <RouteWrapper>
        <DropDown user={mockUser} onLogout={onLogout} />
      </RouteWrapper>
    );
    fireEvent.click(screen.getByRole("button")); // open dropdown
    fireEvent.click(screen.getByText(/logout/i));
    expect(onLogout).toHaveBeenCalled();
  });

  it("closes dropdown on outside click", () => {
    const { getByRole, queryByText } = render(
      <>
        <RouteWrapper>
          <DropDown user={mockUser} onLogout={vi.fn()} />
        </RouteWrapper>
        <div data-testid="outside">Outside</div>
      </>
    );
    fireEvent.click(getByRole("button")); // open
    expect(queryByText(/profile/i)).toBeInTheDocument();

    fireEvent.mouseDown(screen.getByTestId("outside")); // click outside
    expect(queryByText(/profile/i)).not.toBeInTheDocument();
  });
});
