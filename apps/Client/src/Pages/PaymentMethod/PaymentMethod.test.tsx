import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import PaymentMethod from "./PaymentMethod";
import { Wrapper } from "../../TestSetup";

it("Check if the payment method is displayed", async () => {
  localStorage.setItem("address", "PayPal or Credit Card");
  render(
    <Wrapper>
      <BrowserRouter>
        <PaymentMethod />
      </BrowserRouter>
    </Wrapper>
  );
  const SelectMethod = screen.getByText("Select Method");
  const PayPalSelect = screen.getByTestId("PayPalButton");
  const CashOnDelivery = screen.getByTestId("CashButton");
  const Continue = screen.getByRole("button", { name: /Continue/i });

  expect(screen.getByText("PAYMENT METHOD")).toBeInTheDocument();
  expect(SelectMethod).toBeInTheDocument();
  expect(PayPalSelect).toBeInTheDocument();
  expect(CashOnDelivery).toBeInTheDocument();
  expect(Continue).toBeInTheDocument();

  expect(PayPalSelect).toBeChecked();
  expect(CashOnDelivery).not.toBeChecked();

  await userEvent.click(CashOnDelivery);

  expect(CashOnDelivery).toBeChecked();
  expect(PayPalSelect).not.toBeChecked();

  await userEvent.click(PayPalSelect);

  expect(PayPalSelect).toBeChecked();
  expect(CashOnDelivery).not.toBeChecked();

  await userEvent.click(Continue);

  // check if the payment method is stored in local storage
  expect(localStorage.payMethod).toBe("PayPal or Credit Card");

  // check location after clicking continue
  expect(window.location.pathname).toBe("/checkout/PlaceOrder");
});

it("Redirects to address page if no address is stored in local storage", () => {
  localStorage.removeItem("address");
  render(
    <Wrapper>
      <BrowserRouter>
        <PaymentMethod />
      </BrowserRouter>
    </Wrapper>
  );
  expect(window.location.pathname).toBe("/checkout/address");
});
