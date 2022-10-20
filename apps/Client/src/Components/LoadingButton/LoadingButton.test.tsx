import { render, screen } from "@testing-library/react";
import LoadingButton from "./LoadingButton";

it("Display Loading State", () => {
  render(<LoadingButton isLoading={true}>Should Not Display</LoadingButton>);
  expect(screen.getByText(/Loading/)).toBeInTheDocument();
  expect(screen.queryByText(/Should Not Display/)).not.toBeInTheDocument();
});

it("Loading Text", () => {
  render(<LoadingButton isLoading={true} loadingText="Custom Loading Test" />);
  expect(screen.getByText(/Custom Loading Test/)).toBeInTheDocument();
});

it("Loading Is False", () => {
  render(<LoadingButton isLoading={false}>Should Display</LoadingButton>);
  expect(screen.getByText(/Should Display/)).toBeInTheDocument();
});
