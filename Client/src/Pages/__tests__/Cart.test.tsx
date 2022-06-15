import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

// Components
import Cart from "../Cart";
import { client, Wrapper } from "../../TestSetup";

const mock = new MockAdapter(axios);

const setup = () => {
  render(
    <Wrapper>
      <BrowserRouter>
        <Cart />
      </BrowserRouter>
    </Wrapper>
  );
};

const EmptyCart = {
  _id: "616721ac6a6b1647b02c6ed9",
  Cart: [],
};

const LoadUserCart = {
  _id: "616721ac6a6b1647b02c6ed9",
  products: [
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
  ],
};

const UpdateProduct = {
  _id: "616721ac6a6b1647b02c6ed9",
  msg: "XyZ Qty Updated in Cart",
  Cart: [
    {
      _id: "61705624b54854000494b5ce",
      product: {
        price: 929.99,
        countInStock: 5,
        _id: "60d5e622e5179e2bb44bd83c",
        name: "Logtech mouse",
        image: "/Photos/image-1627385386692.webp",
      },
      qty: 3,
    },
  ],
};

const AfterDeleteCart = {
  _id: "616721ac6a6b1647b02c6ed9",
  msg: "XyZ is Deleted From the Cart",
};

it("Empty Cart", async () => {
  client.clear();
  mock.onGet("/api/cart").reply(200, EmptyCart);
  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  expect(screen.getByText(/Your Cart is Empty/)).toBeInTheDocument();
});

it("Mock Get User Cart On Load", async () => {
  mock.onGet("/api/cart").reply(200, LoadUserCart);

  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  expect(screen.getByText(/Bluetooth Headphones/)).toBeInTheDocument();
  expect(screen.getByText(/Logtech mouse/)).toBeInTheDocument();
});

it("Mock Change Cart Qty", async () => {
  mock.onGet("/api/cart").reply(200, LoadUserCart);
  mock.onPost("/api/cart").reply(200, UpdateProduct);

  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  const QtySelects = screen.getAllByTestId("selectQty");
  userEvent.selectOptions(QtySelects[1], "1");
  await waitFor(() => screen.findByText(/Updated in Cart/));
});

it("Mock Delete Product Form Cart", async () => {
  mock.onGet("/api/cart").reply(200, LoadUserCart);
  mock
    .onDelete(`/api/cart/${LoadUserCart.products[0].product._id}`)
    .reply(200, AfterDeleteCart);

  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  const DeleteBtn = screen.getAllByTestId("DeleteIcon");

  userEvent.click(DeleteBtn[0]);

  await waitFor(() => screen.findByText(/Deleted From the Cart/));
});
