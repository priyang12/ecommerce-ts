import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import { Route, Router, Routes } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";
import { createMemoryHistory } from "history";
import PlaceOrder from "./PlaceOrder";
import userEvent from "@testing-library/user-event";
import MockedData from "../../FakeData/CartData.json";
import { Wrapper } from "../../TestSetup";
import { act } from "react-test-renderer";
import { CheckoutContext } from "../../Context/CheckoutContext/CheckoutContext";
import { vi } from "vitest";

const route = "/PlaceOrder";
const History = createMemoryHistory({ initialEntries: [route] });
const mock = new MockAdapter(axios);

mock.onGet("/api/cart").reply(200, MockedData.LoadUserCart);

const address = {
  homeAddress: "202,Pipload",
  city: "Surat",
  postalCode: "456123",
  country: "India",
};

const Method = "PayPal or Credit Card";

const ProductsAmount = MockedData.LoadUserCart.products.reduce(
  (acc, item) => acc + item.product.price * item.qty,
  0
);

const ShippingAmount = ProductsAmount! > 500 ? 0 : 100;
const TaxAmount = 0.15 * ProductsAmount!;
const TotalAmount = ProductsAmount! + ShippingAmount + TaxAmount;

const expectedOrder = {
  orderItems: MockedData.LoadUserCart.products,
  shippingAddress: address,
  paymentMethod: Method,
  itemsPrice: ProductsAmount,
  taxPrice: TaxAmount,
  shippingPrice: ShippingAmount,
  totalPrice: Math.round(TotalAmount),
};

const mockDispatch = vi.fn();

const mockContextValue = (overrides = {}) =>
  ({
    state: {
      address: null,
      payMethod: "PayPal or Credit Card",
      ...overrides,
    },
    mockDispatch,
  } as any);

const Setup = (contextOverrides = {}) => {
  return render(
    <Wrapper>
      <Router navigator={History} location={route}>
        <Routes>
          <Route
            path="PlaceOrder"
            element={
              <CheckoutContext.Provider
                value={mockContextValue(contextOverrides)}
              >
                <PlaceOrder />
              </CheckoutContext.Provider>
            }
          />
        </Routes>
      </Router>
    </Wrapper>
  );
};

it("Return to address Page when address is not available", async () => {
  Setup({ address: undefined });
  expect(History.location.pathname).toBe("/checkout/address");
});

it("Return to payMethod Page", async () => {
  Setup({ address: {}, payMethod: undefined });
  expect(History.location.pathname).toBe("/checkout/paymentMethod");
});

// fix loading issue
it.skip("Check For Amount Summery", async () => {
  Setup();

  await waitForElementToBeRemoved(screen.getByTestId("Loading"));

  expect(screen.getByTestId("ShippingCost").textContent).toMatch(
    String(ShippingAmount)
  );
  expect(screen.getByTestId("TaxCost").textContent).toMatch(String(TaxAmount));

  expect(screen.getByTestId("TotalAmount").textContent).toMatch(
    String(Math.round(TotalAmount))
  );
});

// fix loading issue
it.skip("Store Order in state And Redirect to Payment Gateway", async () => {
  Setup();
  const placeOrderButton = screen.getByText(/PlaceOrder/i);
  await userEvent.click(placeOrderButton);

  expect(mockDispatch).toHaveBeenCalledWith({
    type: "SET_ORDER",
    payload: expectedOrder,
  });

  expect(History.location.pathname).toBe("/checkout/paypal");
});

it("Redirect on Empty Cart", async () => {
  mock.onGet("/api/cart").reply(200, { products: [] });
  await act(() => {
    Setup();
  });
  expect(History.location.pathname).toBe("/");
});
