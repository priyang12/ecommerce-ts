import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Product } from "../../../Types/interfaces";
import Slide from "../Slide";
import { BrowserRouter, Route } from "react-router-dom";

const mockProduct: Product = {
  _id: "1",
  name: "Test Product",
  description: "This is a test product",
  image: "/test.jpg",
  price: 99.99,
  rating: 4.5,
  numReviews: 42,
};

describe("Slide Component", () => {
  const baseProps = {
    slide: mockProduct,
    onMouseEnter: vi.fn(),
    onMouseLeave: vi.fn(),
    onFocus: vi.fn(),
    dispatch: vi.fn(),
  };

  it("renders product title and description", () => {
    render(
      <BrowserRouter>
        <Slide {...baseProps} offset={0} />
      </BrowserRouter>
    );
    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText("This is a test product")).toBeInTheDocument();
  });

  it("renders 'Show More' link only when active (offset === 0)", () => {
    const { rerender } = render(
      <BrowserRouter>
        <Slide {...baseProps} offset={0} />
      </BrowserRouter>
    );
    expect(screen.getByText(/Show More/i)).toBeVisible();

    rerender(
      <BrowserRouter>
        <Slide {...baseProps} offset={1} />
      </BrowserRouter>
    );
    expect(screen.queryByText(/Show More/i)).not.toBeVisible();
  });

  it("calls dispatch with NEXT when touched and offset is 1", () => {
    const dispatch = vi.fn();
    render(
      <BrowserRouter>
        <Slide {...baseProps} offset={1} dispatch={dispatch} />
      </BrowserRouter>
    );

    const slide =
      screen.getByRole("presentation", { hidden: true }) ||
      screen.getByText("Test Product").closest("div");
    fireEvent.touchMove(slide!, { touches: [{ clientX: 0, clientY: 0 }] });

    expect(dispatch).toHaveBeenCalledWith({ type: "NEXT" });
  });

  it("calls dispatch with PREV when touched and offset is -1", () => {
    const dispatch = vi.fn();
    render(
      <BrowserRouter>
        <Slide {...baseProps} offset={-1} dispatch={dispatch} />
      </BrowserRouter>
    );

    const slide =
      screen.getByRole("presentation", { hidden: true }) ||
      screen.getByText("Test Product").closest("div");
    fireEvent.touchMove(slide!, { touches: [{ clientX: 0, clientY: 0 }] });

    expect(dispatch).toHaveBeenCalledWith({ type: "PREV" });
  });

  it("applies correct transform and offset variables", () => {
    render(
      <BrowserRouter>
        <Slide {...baseProps} offset={1} />
      </BrowserRouter>
    );

    const slide =
      screen.getByRole("presentation", { hidden: true }) ||
      screen.getByText("Test Product").closest("div");

    expect(slide.style.getPropertyValue("--offset")).toBe("1");
    expect(slide.style.getPropertyValue("--dir")).toBe("1");
    expect(slide).toHaveAttribute("aria-roledescription", "slide");
    expect(slide).toHaveAttribute(
      "aria-label",
      `Slide for ${mockProduct.name}`
    );
  });
});
