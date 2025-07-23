import Quantity from "./Quantity";
import { render, screen } from "@testing-library/react";

describe("Quantity", () => {
  it("renders default placeholder option", () => {
    render(
      <select>
        <Quantity countInStock={3} />
      </select>
    );
    expect(screen.getByText(/select quantity/i)).toBeInTheDocument();
  });

  it("renders the correct number of options based on countInStock", () => {
    const count = 5;
    render(
      <select>
        <Quantity countInStock={count} />
      </select>
    );
    const options = screen.getAllByRole("option");
    // includes 1 placeholder + countInStock
    expect(options).toHaveLength(count + 1);
  });

  it("renders default placeholder option", () => {
    render(
      <select>
        <Quantity countInStock={3}>
          <option value={""}>custom quantity</option>
        </Quantity>
      </select>
    );
    expect(screen.getByText(/custom quantity/i)).toBeInTheDocument();
  });

  it("renders options with correct values and text", () => {
    render(
      <select>
        <Quantity countInStock={3} />
      </select>
    );
    expect(screen.getByRole("option", { name: "1" })).toHaveValue("1");
    expect(screen.getByRole("option", { name: "2" })).toHaveValue("2");
    expect(screen.getByRole("option", { name: "3" })).toHaveValue("3");
  });

  it("renders nothing beyond countInStock", () => {
    render(
      <select>
        <Quantity countInStock={2} />
      </select>
    );
    expect(screen.queryByRole("option", { name: "3" })).not.toBeInTheDocument();
  });
});
