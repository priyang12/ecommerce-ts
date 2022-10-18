import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TimeoutBtn from "../TimeoutBtn";
import "@testing-library/jest-dom";

it("Disable and Enable on CLick", async () => {
  render(<TimeoutBtn className="btn" FormValue="ADD TO CART" Time={2000} />);
  const Btn = screen.getByText(/ADD TO CART/i);
  Btn.click();
  await waitFor(() => expect(Btn).toBeDisabled());
  await waitFor(() => expect(Btn).not.toBeDisabled(), { timeout: 2000 });
});
