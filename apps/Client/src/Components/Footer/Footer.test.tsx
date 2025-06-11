import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import { describe, it, expect } from "vitest";

const renderWithRouter = (initialPath: string) => {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Footer />
    </MemoryRouter>
  );
};

describe("Footer Component", () => {
  it("should render footer by default (non-restricted route)", () => {
    renderWithRouter("/home");

    expect(screen.getByAltText(/logo/i)).toBeInTheDocument();
    expect(screen.getByText(/ecommerce, also known/i)).toBeInTheDocument();
    expect(screen.getByText(/Links/i)).toBeInTheDocument();
    expect(screen.getByText(/Phone:/i)).toBeInTheDocument();
  });

  it("should not render footer on /Auth/login route", () => {
    renderWithRouter("/Auth/login");
    expect(
      screen.queryByText(/ecommerce, also known/i)
    ).not.toBeInTheDocument();
  });

  it("should not render footer on /Auth/register route", () => {
    renderWithRouter("/Auth/register");
    expect(
      screen.queryByText(/ecommerce, also known/i)
    ).not.toBeInTheDocument();
  });

  it("should not render footer on /PlaceOrder route", () => {
    renderWithRouter("/PlaceOrder");
    expect(
      screen.queryByText(/ecommerce, also known/i)
    ).not.toBeInTheDocument();
  });

  it("should not render footer on /PayPal route", () => {
    renderWithRouter("/PayPal");
    expect(
      screen.queryByText(/ecommerce, also known/i)
    ).not.toBeInTheDocument();
  });

  it("should render horizontal links", () => {
    renderWithRouter("/home");

    const linkItems = screen.getAllByRole("link");
    expect(linkItems.some((link) => link.textContent === "Home")).toBe(true);
    expect(linkItems.some((link) => link.textContent === "About")).toBe(true);
    expect(linkItems.some((link) => link.textContent === "Services")).toBe(
      true
    );
    expect(linkItems.some((link) => link.textContent === "Contact")).toBe(true);
  });
});
