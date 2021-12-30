import { render, screen, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import "@testing-library/jest-dom";
import TimeoutBtn from "../TimeoutBtn";

it("Disable and Enable on CLick", () => {
  jest.useFakeTimers();
  render(<TimeoutBtn classname='btn' FormValue='ADD TO CART' Time={2000} />);
  const Btn = screen.getByText(/ADD TO CART/i);
  userEvent.click(Btn);
  act(() => {
    jest.advanceTimersByTime(1);
    expect(Btn).toBeDisabled();
    jest.advanceTimersByTime(2000);
    expect(Btn).not.toBeDisabled();
  });
});
