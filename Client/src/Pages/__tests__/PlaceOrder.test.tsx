import { render, screen, act } from "@testing-library/react";
import { Router } from "react-router-dom";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { createMemoryHistory, MemoryHistory } from "history";
import PlaceOrder from "../PlaceOrder";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

let History: MemoryHistory<unknown>;

// Auth Context

const state = {
  loading: false,
  err: null,
  token: null,
  user: {
    name: "Priyang",
    isAdmin: false,
    email: "asdas",
    id: "asdasd",
    createdAt: "asasd",
  },
};
const dispatch = jest.fn();

//  Local Storage Value
///////////////////////////////xxxxxxxxxxxxxxxxxxxxxxx//////////////////////////////
///////////////////////////////xxxxxxxxxxxxxxxxxxxxxxx//////////////////////////////
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

///////////////////////////////xxxxxxxxxxxxxxxxxxxxxxx//////////////////////////////
///////////////////////////////xxxxxxxxxxxxxxxxxxxxxxx//////////////////////////////

let ExtraAmount = 0;
const addDecimals = (num: number) => {
  const result = Number((Math.round(num * 100) / 100).toFixed(2));
  ExtraAmount += result;
  return result;
};

beforeAll(() => {
  History = createMemoryHistory();
});

const Setup = () => {
  localStorage.setItem("Cart", JSON.stringify(Cart));
  localStorage.setItem("address", JSON.stringify(address));
  localStorage.setItem("payMethod", Method);
  localStorage.setItem("ProductsAmount", JSON.stringify(productsAmount));
  const contextValue = {
    state,
    dispatch,
  };
  ExtraAmount = 0;
  return render(
    <>
      <AuthContext.Provider value={contextValue}>
        <Router history={History}>
          <PlaceOrder />
        </Router>
      </AuthContext.Provider>
    </>
  );
};

describe("Check Redirects", () => {
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
});

describe("Check Order Details", () => {
  it("Check For Amount Summery", () => {
    Setup();
    const shipping = addDecimals(productsAmount > 500 ? 0 : 100);
    const Tax = addDecimals(productsAmount * 0.1);

    expect(screen.getByTestId("ShippingCost").textContent).toMatch(
      String(shipping)
    );
    expect(screen.getByTestId("TaxCost").textContent).toMatch(String(Tax));

    const TotalAmount = Math.round(shipping + Tax + productsAmount);
    expect(screen.getByTestId("TotalAmount").textContent).toMatch(
      String(TotalAmount)
    );
  });

  it("Store Order in Local Storage And Redirect to Payment Gateway", () => {
    Setup();
    jest.useFakeTimers();
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
    userEvent.click(PlaceOrderBtn);
    act(() => {
      jest.advanceTimersByTime(1);
    });
    expect(PlaceOrderBtn).toBeDisabled();
    expect(JSON.parse(localStorage.order)).toStrictEqual(Order);
    expect(History.location.pathname).toMatch(/PayPal/);
  });
});
