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
import { Address } from "../../Types/interfaces";

const route = "/PlaceOrder";
const History = createMemoryHistory({ initialEntries: [route] });
const mock = new MockAdapter(axios);

mock.onGet("/api/cart").reply(200, MockedData.LoadUserCart);

const address: Address = {
  address: "742 Evergreen Terrace",
  city: "Springfield",
  postalcode: "62704",
};

const Method = "PayPal or Credit Card";

const ProductsAmount = MockedData.LoadUserCart.products.reduce(
  (acc, item) => acc + item.product.price * item.qty,
  0
);
const ShippingAmount = ProductsAmount > 500 ? 0 : 100;
const TaxAmount = +(0.15 * ProductsAmount).toFixed(2);
const TotalAmount = +(ProductsAmount + ShippingAmount + TaxAmount).toFixed(2);

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
    dispatch: mockDispatch,
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

it("Check For Amount Summery", async () => {
  await act(() => {
    Setup({ address: address, payMethod: "none" });
  });

  expect(screen.getByTestId("ShippingCost").textContent).toMatch(
    ShippingAmount.toString()
  );
  expect(screen.getByTestId("TaxCost").textContent).toMatch(
    TaxAmount.toString()
  );

  expect(screen.getByTestId("TotalAmount").textContent).toMatch(
    Math.round(TotalAmount).toString()
  );
});

it("Store Order in state And Redirect to Payment Gateway", async () => {
  await act(() => {
    Setup({ address: address });
  });

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
    Setup({ address: {} });
  });
  expect(History.location.pathname).toBe("/");
});
