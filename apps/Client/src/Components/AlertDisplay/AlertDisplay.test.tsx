import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import AlertDisplay from "./AlertDisplay";

// vi.mock("./StyledAlertDisplay", () => ({
//   ...vi.importActual("./StyledAlertDisplay"),
//   StyledAlertContainer: ({ children, className }: any) => (
//     <div data-testid="alert-container" className={className}>
//       {children}
//     </div>
//   ),
//   StyledAlertDisplay: ({ children }: any) => (
//     <div data-testid="alert-message">{children}</div>
//   ),
// }));

// fix the class compare. linaria will convert the class to something else.
describe.skip("AlertDisplay Component", () => {
  // Mock Axios error data
  const mockAxiosError: any = {
    response: {
      data: {
        msg: "Server error message",
      },
    },
  };

  const mockAxiosErrorWithoutMsg: any = {
    response: {
      data: {},
    },
  };

  it("renders default info alert with message", () => {
    render(<AlertDisplay msg="Test info message" />);

    expect(screen.getByText("Test info message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alertInfo"); // Assuming your styled component adds this class
  });

  it("renders success alert with correct styling", () => {
    render(<AlertDisplay msg="Success message" type="success" />);

    expect(screen.getByText("Success message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alertSuccess");
  });

  it("displays Axios error message when provided", () => {
    render(
      <AlertDisplay
        msg="Fallback message"
        AxiosErrorState={mockAxiosError}
        type="error"
      />
    );

    expect(screen.getByText("Server error message")).toBeInTheDocument();
    expect(screen.queryByText("Fallback message")).not.toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alertError");
  });

  it("renders children components inside alert", () => {
    render(
      <AlertDisplay msg="Warning message" type="warning">
        <button>Retry</button>
      </AlertDisplay>
    );

    expect(screen.getByText("Warning message")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Retry" })).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alertWarning");
  });

  it("falls back to msg when no Axios error provided", () => {
    render(<AlertDisplay msg="Regular message" type="info" />);

    expect(screen.getByText("Regular message")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toHaveClass("alertInfo");
  });

  it("falls back to msg when Axios error has no message", () => {
    render(
      <AlertDisplay
        msg="Fallback message"
        AxiosErrorState={mockAxiosErrorWithoutMsg}
      />
    );

    expect(screen.getByText("Fallback message")).toBeInTheDocument();
  });
});
