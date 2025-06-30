import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Rating from "./Rating";

describe("Rating Component", () => {
  // Test 1: Renders 5 full stars when value is 5
  it("renders 5 full stars for value=5", () => {
    render(<Rating value={5} text="5 stars" />);
    const fullStars = screen.getAllByRole("img", { name: "full-star" });
    expect(fullStars).toHaveLength(5);
    expect(screen.getByText("5 stars")).toBeInTheDocument();
  });

  // Test 2: Renders 3 full stars + 1 half star for value=3.5
  it("renders mixed stars for value=3.5", () => {
    render(<Rating value={3.5} text="3.5 stars" />);
    expect(screen.getAllByRole("img", { name: "full-star" })).toHaveLength(3);
    expect(screen.getAllByRole("img", { name: "half-star" })).toHaveLength(1);
    expect(screen.getAllByRole("img", { name: "empty-star" })).toHaveLength(1);
  });

  // Test 3: Renders 5 empty stars for value=0
  it("renders empty stars for value=0", () => {
    render(<Rating value={0} text="0 stars" />);
    expect(screen.queryAllByRole("img", { name: "full-star" })).toHaveLength(0);
    expect(screen.getAllByRole("img", { name: "empty-star" })).toHaveLength(5);
  });

  // Test 4: Uses custom star color
  it("applies custom color to stars", () => {
    const customColor = "#ff0000";
    render(<Rating value={2} text="2 stars" color={customColor} />);
    const stars = screen.getAllByRole("img", { name: "full-star" });
    expect(stars[0]).toHaveAttribute("color", customColor);
  });

  // Test 5: Defaults to gold color if no color prop
  it("uses default color when no prop is passed", () => {
    render(<Rating value={1} text="1 star" />);
    const star = screen.getByRole("img", { name: "full-star" });
    expect(star).toHaveAttribute("color", "#f8e825");
  });

  // Test 6: Does not render text if empty
  it("hides text when not provided", () => {
    render(<Rating value={4} text="" />);
    expect(screen.queryByTestId("rating-text")).toBeNull(); // Adjust if you use ARIA for text
  });
});
