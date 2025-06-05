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

localStorage.setItem("address", JSON.stringify(address));
localStorage.setItem("payMethod", Method);

const Setup = () => {
  return render(
    <Wrapper>
      <Router navigator={History} location={route}>
        <Routes>
          <Route path="PlaceOrder" element={<PlaceOrder />} />
        </Routes>
      </Router>
    </Wrapper>
  );
};

it("Check For Amount Summery", async () => {
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

it("Store Order in Local Storage And Redirect to Payment Gateway", async () => {
  Setup();
  const Order = {
    orderItems: MockedData.LoadUserCart.products,
    shippingAddress: address,
    paymentMethod: Method,
    itemsPrice: ProductsAmount,
    taxPrice: TaxAmount,
    shippingPrice: ShippingAmount,
    totalPrice: Math.round(TotalAmount),
  };

  const PlaceOrderBtn = screen.getByText(/PlaceOrder/);
  await userEvent.click(PlaceOrderBtn);
  expect(JSON.parse(localStorage.order)).toStrictEqual(Order);
  expect(History.location.pathname).toMatch(/PayPal/);
});

it("Redirect on Empty Cart", async () => {
  mock.onGet("/api/cart").reply(200, { products: [] });
  await act(() => {
    Setup();
  });
  expect(History.location.pathname).toBe("/");
});

it("Return to address Page when address is not available", async () => {
  Setup();
  await act(() => {
    localStorage.removeItem("address");
  });
  expect(History.location.pathname).toBe("/address");
});

it("Return to payMethod Page", async () => {
  Setup();
  await act(() => {
    localStorage.setItem("address", JSON.stringify(address));
    localStorage.removeItem("payMethod");
  });
  expect(History.location.pathname).toBe("/paymentMethod");
});
