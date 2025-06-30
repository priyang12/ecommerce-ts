import Spinner from "./Spinner";
import { render, screen } from "@testing-library/react";

describe("Spinner", () => {
  it("renders without crashing", () => {
    render(<Spinner />);
    expect(screen.getByTestId("Loading")).toBeInTheDocument();
  });
  it("renders with alt name and img", () => {
    render(<Spinner />);
    expect(screen.getByAltText("Loading Please Wait")).toBeInTheDocument();
    expect(screen.getByAltText("Loading Please Wait")).toHaveAttribute(
      "src",
      "/src/Assets/loading.gif"
    );
  });
});
