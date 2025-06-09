import { BrowserRouter } from "react-router-dom";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AddressPage from "./AddressPage";
import { Address } from "../../Types/interfaces";
import { Wrapper } from "../../TestSetup";
import { CheckoutContext } from "../../Context/CheckoutContext/CheckoutContext";
import { vi } from "vitest";

beforeEach(() => {
  localStorage.clear();
});

it("does not submit on invalid input", async () => {
  render(
    <Wrapper>
      <BrowserRouter>
        <AddressPage />
      </BrowserRouter>
    </Wrapper>
  );
  await userEvent.click(screen.getByText(/Continue/i));
  // You can assert that localStorage is still empty or error message appears
  expect(localStorage.getItem("checkout-address")).toBeNull();
});

const mockDispatch = vi.fn();

const renderWithCheckoutContext = () => {
  return render(
    <Wrapper>
      <CheckoutContext.Provider value={{ state: {}, dispatch: mockDispatch }}>
        <BrowserRouter>
          <AddressPage />
        </BrowserRouter>
      </CheckoutContext.Provider>
    </Wrapper>
  );
};

it("dispatches SET_ADDRESS on valid form submit", async () => {
  renderWithCheckoutContext();

  const address: Address = {
    address: "Pipload",
    city: "Surat",
    postalcode: "456123",
  };

  await userEvent.type(screen.getByLabelText(/address/i), address.address);
  await userEvent.type(screen.getByLabelText(/city/i), address.city);
  await userEvent.type(
    screen.getByLabelText(/postal code/i),
    address.postalcode
  );

  await userEvent.click(screen.getByText(/Continue/i));

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_ADDRESS",
    payload: address,
  });
});
