import { render, screen, act, waitFor } from "@testing-library/react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import {
  AuthContext,
  AuthState,
} from "../../Context/Authentication/AuthContext";
import { createMemoryHistory } from "history";
import PlaceOrder from "./PlaceOrder";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import { Wrapper } from "../../TestSetup";

const route = "/PlaceOrder";
const History = createMemoryHistory({ initialEntries: [route] });

const Cart = [
  {
    _id: "617028b4ae931d0004f7d964",
    product: {
      price: 89.99,
      countInStock: 2,
      _id: "60d5e622e5179e2bb44bd838",
      name: "Airpods Wireless Bluetooth Headphones",
      image: "/Photos/image-1627384388351.webp",
    },
    qty: 2,
  },
  {
    _id: "61705624b54854000494b5ce",
    product: {
      price: 929.99,
      countInStock: 5,
      _id: "60d5e622e5179e2bb44bd83c",
      name: "Logtech mouse",
      image: "/Photos/image-1627385386692.webp",
    },
    qty: 1,
  },
];

const address = {
  homeAddress: "202,Pipload",
  city: "Surat",
  postalCode: "456123",
  country: "India",
};

const Method = "PayPal or Credit Card";

const productsAmount = 2000;

let ExtraAmount = 0;

const addDecimals = (num: number) => {
  const result = Number((Math.round(num * 100) / 100).toFixed(2));
  ExtraAmount += result;
  return result;
};

const state: AuthState = {
  loading: false,
  err: null,
  token: null,
  user: {
    name: "Priyang",
    isAdmin: false,
    email: "asdas",
    _id: "asdasd",
  },
  alert: null,
};

localStorage.setItem("Cart", JSON.stringify(Cart));
localStorage.setItem("address", JSON.stringify(address));
localStorage.setItem("payMethod", Method);
localStorage.setItem("ProductsAmount", JSON.stringify(productsAmount));

const Setup = () => {
  ExtraAmount = 0;
  return render(
    <Wrapper>
      <Router navigator={History} location={route}>
        <Routes>
          <Route
            path="PlaceOrder"
            element={
              <AuthContext.Provider
                value={{
                  state,
                  dispatch: jest.fn(),
                }}
              >
                <PlaceOrder />
              </AuthContext.Provider>
            }
          />
        </Routes>
      </Router>
    </Wrapper>
  );
};

it("Check For Amount Summery", async () => {
  Setup();

  const shipping = addDecimals(productsAmount > 500 ? 0 : 100);
  const Tax = addDecimals(productsAmount * 0.1);

  await waitFor(() => screen.getByTestId("ShippingCost"));

  expect(screen.getByTestId("ShippingCost").textContent).toMatch(
    String(shipping)
  );
  expect(screen.getByTestId("TaxCost").textContent).toMatch(String(Tax));

  const TotalAmount = Math.round(shipping + Tax + productsAmount);
  expect(screen.getByTestId("TotalAmount").textContent).toMatch(
    String(TotalAmount)
  );
});

it("Store Order in Local Storage And Redirect to Payment Gateway", async () => {
  Setup();

  const shipping = addDecimals(productsAmount > 500 ? 0 : 100);
  const Tax = addDecimals(productsAmount * 0.1);
  const Order = {
    orderItems: Cart,
    shippingAddress: address,
    paymentMethod: Method,
    itemsPrice: productsAmount,
    taxPrice: Tax,
    shippingPrice: shipping,
    totalPrice: Math.round(ExtraAmount + productsAmount),
  };
  const PlaceOrderBtn = screen.getByText(/PlaceOrder/);
  await userEvent.click(PlaceOrderBtn);

  await waitFor(() => expect(PlaceOrderBtn).toBeDisabled());

  expect(JSON.parse(localStorage.order)).toStrictEqual(Order);
  expect(History.location.pathname).toMatch(/PayPal/);
});

it("Return to cart Page Removed Values", () => {
  localStorage.clear();
  Setup();
  expect(History.location.pathname).toBe("/");
});
it("Return to cart Page on Empty Cart", () => {
  localStorage.setItem("cart", JSON.stringify([]));
  localStorage.setItem("address", JSON.stringify(address));
  localStorage.setItem("payMethod", Method);
  localStorage.setItem("productsAmount", JSON.stringify(productsAmount));
  Setup();
  expect(History.location.pathname).toBe("/");
});
