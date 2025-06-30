import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { Product } from "../../Types/interfaces";
import ProductCard from "../ProductCard";

// Mock useNavigate from react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: vi.fn(),
  };
});

describe("ProductCard", () => {
  const product = {
    _id: "123",
    name: "Test Product",
    image: "https://via.placeholder.com/150",
    price: 99.99,
    rating: 4.5,
    numReviews: 10,
  } as any;

  it("renders product name, image, price, and rating", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
    expect(screen.getByAltText(/Test Product/i)).toHaveAttribute(
      "src",
      expect.stringContaining(product.image)
    );
    expect(screen.getByText("$99.99 Only")).toBeInTheDocument();
    expect(screen.getByText(/10 reviews/i)).toBeInTheDocument();
  });

  it("has accessible tabIndex and is focusable", () => {
    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    const card = screen.getByText("Test Product").closest("div");
    expect(card).toHaveAttribute("tabIndex", "0");
  });
  it("displays 'Limited Time Deal' when showLimitedDeal condition is met", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.3).mockReturnValueOnce(0.6); // limited deal = true, free delivery = false

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(screen.getByText(/Limited Time Deal/i)).toBeInTheDocument();

    (Math.random as any).mockRestore(); // Restore original function
  });

  it("displays 'FREE delivery within 1 week' when showFreeDelivery condition is met", () => {
    vi.spyOn(Math, "random").mockReturnValueOnce(0.6).mockReturnValueOnce(0.4); // limited deal = false, free delivery = true

    render(
      <MemoryRouter>
        <ProductCard product={product} />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/FREE delivery within 1 week/i)
    ).toBeInTheDocument();

    (Math.random as any).mockRestore(); // Restore original function
  });
});
