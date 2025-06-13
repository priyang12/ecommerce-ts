import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import CartContainerComponent from "./CartProductions";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import { Wrapper } from "../../../TestSetup";
import MockedData from "../../../FakeData/CartData.json";
import { vi } from "vitest";

const mock = new MockAdapter(axios);
const mockSetAlert = vi.fn();
const setup = () => {
  render(
    <Wrapper>
      <BrowserRouter>
        <CartContainerComponent setAlert={mockSetAlert} />
      </BrowserRouter>
    </Wrapper>
  );
};

const LoadUserCart = MockedData.LoadUserCart;
const AfterDeleteCart = MockedData.AfterDeleteCart;

beforeEach(() => {
  mock.reset(); // Clear previous handlers
});

it("renders 'Your Cart is Empty' when cart has no items", async () => {
  mock.onGet("/api/cart").reply(200, { products: [] });

  setup();

  await waitFor(() => {
    expect(screen.getByText(/Your Cart is Empty/i)).toBeInTheDocument();
  });
});

it("shows spinner while loading", async () => {
  mock.onGet("/api/cart").reply(() => {
    return new Promise((resolve) => {
      setTimeout(() => resolve([200, LoadUserCart]), 100); // delay
    });
  });

  setup();

  expect(screen.getByAltText(/Loading/i)).toBeInTheDocument();

  await waitForElementToBeRemoved(() => screen.queryByAltText(/Loading/i));
});

it("displays all cart items after loading", async () => {
  mock.onGet("/api/cart").reply(200, LoadUserCart);

  setup();

  await waitForElementToBeRemoved(() => screen.queryByAltText(/Loading/i));

  LoadUserCart.products.forEach((item) => {
    expect(screen.getByText(item.product.name)).toBeInTheDocument();
  });

  const totalQty = LoadUserCart.products.reduce((acc, i) => acc + i.qty, 0);
  const totalPrice =
    Math.round(
      LoadUserCart.products.reduce(
        (acc, i) => acc + i.product.price * i.qty,
        0
      ) * 100
    ) / 100;

  expect(screen.getByText(`SUBTOTAL (${totalQty}) ITEMS`)).toBeInTheDocument();
  expect(screen.getByText(`$ ${totalPrice}`)).toBeInTheDocument();
});

it("deletes an item from the cart", async () => {
  const productId = LoadUserCart.products[0].product._id;

  mock.onGet("/api/cart").reply(200, LoadUserCart);
  mock.onDelete(`/api/cart/${productId}`).reply(200, AfterDeleteCart);

  setup();

  await waitForElementToBeRemoved(() => screen.queryByAltText(/Loading/i));

  const deleteBtns = screen.getAllByTestId("DeleteIcon");

  await userEvent.click(deleteBtns[0]);
});
