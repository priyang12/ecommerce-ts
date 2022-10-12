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
import MockedData from "./FakeData/CartData.json";

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

const UpdateProduct = MockedData.UpdateProduct;

const AfterDeleteCart = MockedData.AfterDeleteCart;

const LoadUserCart = MockedData.LoadUserCart;

it("Empty Cart", async () => {
  client.clear();
  mock.onGet("/api/cart").reply(200, {
    _id: "616721ac6a6b1647b02c6ed9",
    products: [],
  });
  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  expect(screen.getByText(/Your Cart is Empty/)).toBeInTheDocument();
});

it("Mock Get User Cart On Load", async () => {
  mock.onGet("/api/cart").reply(200, LoadUserCart);

  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  LoadUserCart.products.forEach((item) => {
    expect(screen.getByText(item.product.name)).toBeInTheDocument();
  });
});

it("Mock Change Cart Qty", async () => {
  mock.onPost("/api/cart").reply(200, UpdateProduct);
  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  const QtySelects = screen.getAllByTestId("selectQty");
  userEvent.selectOptions(QtySelects[1], "1");
  await waitFor(() => screen.findByText(UpdateProduct.msg));
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

  await waitFor(() => screen.findByText(/Deleting/));
});
