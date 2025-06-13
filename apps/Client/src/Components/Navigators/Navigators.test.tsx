import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, Mock } from "vitest";
import Navigators from "./Navigators";
import { MemoryRouter, Route, Routes, useLocation } from "react-router-dom";

// Mock useLocation hook
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useLocation: vi.fn(),
  };
});

describe("Navigators Component", () => {
  // Helper component to test with different routes
  const TestComponent = ({ initialPath }: { initialPath: string }) => (
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="*" element={<Navigators />} />
      </Routes>
    </MemoryRouter>
  );

  // Test 1: Renders navigation links when not on /checkout/paypal
  it("renders navigation links for checkout steps", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/checkout/address" });
    render(<TestComponent initialPath="/checkout/address" />);

    expect(screen.getByText("Address")).toBeInTheDocument();
    expect(screen.getByText("Payment")).toBeInTheDocument();
    expect(screen.getByText("Place Order")).toBeInTheDocument();
  });

  // Test 2: Applies active class to current route
  it("adds Link-border class to active link", () => {
    (useLocation as Mock).mockReturnValue({
      pathname: "/checkout/paymentMethod",
    });
    render(<TestComponent initialPath="/checkout/paymentMethod" />);

    const paymentLink = screen.getByText("Payment").closest("li");
    expect(paymentLink).toHaveClass("Link-border");

    const addressLink = screen.getByText("Address").closest("li");
    expect(addressLink).not.toHaveClass("Link-border");
  });

  // Test 3: Returns null when on /checkout/paypal route
  it("returns null when path is /checkout/paypal", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/checkout/paypal" });
    render(<TestComponent initialPath="/checkout/paypal" />);

    expect(screen.queryByText("Address")).not.toBeInTheDocument();
    expect(screen.queryByText("Payment")).not.toBeInTheDocument();
  });

  // Test 4: Links have correct href attributes
  it("has correct links for each step", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/checkout/address" });
    render(<TestComponent initialPath="/checkout/address" />);

    expect(screen.getByText("Address").closest("a")).toHaveAttribute(
      "href",
      "/checkout/address"
    );
    expect(screen.getByText("Payment").closest("a")).toHaveAttribute(
      "href",
      "/checkout/paymentMethod"
    );
    expect(screen.getByText("Place Order").closest("a")).toHaveAttribute(
      "href",
      "/checkout/PlaceOrder"
    );
  });

  // Test 5: Only one active link at a time
  it("has only one active link at any time", () => {
    (useLocation as Mock).mockReturnValue({ pathname: "/checkout/PlaceOrder" });
    render(<TestComponent initialPath="/checkout/PlaceOrder" />);

    const activeLinks = screen
      .getAllByRole("listitem")
      .filter((li) => li.classList.contains("Link-border"));
    expect(activeLinks).toHaveLength(1);
    expect(activeLinks[0]).toHaveTextContent("Place Order");
  });
});
