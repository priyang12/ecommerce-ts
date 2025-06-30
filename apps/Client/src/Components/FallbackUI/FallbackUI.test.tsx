import FallbackUI from "./FallbackUI";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { HelmetProvider } from "react-helmet-async";

describe("FallbackUI Component", () => {
  const mockError = new Error("Test error message");
  const mockReset = vi.fn();

  const renderComponent = (error = mockError) => {
    return render(
      <HelmetProvider>
        <FallbackUI error={error} resetErrorBoundary={mockReset} />
      </HelmetProvider>
    );
  };

  it("renders error message and recovery button", () => {
    renderComponent();

    expect(screen.getByText(/Test error message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /try again/i })
    ).toBeInTheDocument();
  });

  it("displays generic message in production", () => {
    const originalEnv = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    renderComponent();
    expect(screen.getByText(/Server Error/i)).toBeInTheDocument();

    process.env.NODE_ENV = originalEnv;
  });

  it("shows default message when error.message is empty", () => {
    const errorWithoutMessage = new Error("");
    renderComponent(errorWithoutMessage);

    expect(screen.getByText(/Something went wrong/i)).toBeInTheDocument();
  });

  it("triggers resetErrorBoundary when button clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByRole("button", { name: /try again/i }));
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("has correct component structure", () => {
    const { container } = renderComponent();

    expect(container.querySelector("div")).toBeInTheDocument();
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveClass("btn");
  });
});
