import Select from "./Select";
import { render, screen } from "@testing-library/react";

describe("Select", () => {
  it("renders without crashing", () => {
    render(<Select>Select Component</Select>);
    expect(screen.getByText("Select Component")).toBeInTheDocument();
  });
});
