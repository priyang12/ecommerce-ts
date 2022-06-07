import {
  screen,
  render,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { Wrapper } from "../../TestSetup";
import { Products } from "../Testdata/Data";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

import Wishlist from "./Wishlist";

const mock = new MockAdapter(axios);

const setup = () => {
  mock.onGet("/api/wishlist").reply(200, {
    products: Products,
  });
  render(
    <Wrapper>
      <Wishlist />
    </Wrapper>
  );
};

it("Render WishList", async () => {
  setup();
  await waitForElementToBeRemoved(screen.queryByAltText(/Loading/));
  mock.resetHandlers();
  expect(screen.getByText("Wishlist")).toBeInTheDocument();

  Products.forEach((product) => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
    expect(screen.getByText(product.description)).toBeInTheDocument();
    expect(screen.getByText(product.price)).toBeInTheDocument();
    const image = screen.getByAltText(product.name) as HTMLImageElement;
    expect(image.src).toContain(product.image);
  });
});

it("Delete Product from WishList", async () => {
  mock.onDelete(`/api/wishlist/${Products[0]._id}`).reply(200, {
    msg: "Product Deleted",
  });
  setup();
  await waitFor(() => screen.findByAltText(Products[0].name));

  expect(screen.getByText("Wishlist")).toBeInTheDocument();

  const deleteButton = screen.getByTestId(`Delete-${Products[0]._id}`);
  userEvent.click(deleteButton);
  await waitFor(() => screen.findByText(/Deleting/));

  expect(screen.getByText(/Product Deleted/)).toBeInTheDocument();
});

it("Delete Error", async () => {
  mock.onDelete(`/api/wishlist/${Products[0]._id}`).reply(501, {
    msg: "Server Error",
  });
  setup();
  await waitFor(() => screen.findByAltText(Products[0].name));
  const deleteButton = screen.getByTestId(`Delete-${Products[0]._id}`);
  userEvent.click(deleteButton);
  await waitFor(() => screen.findByText(/Deleting/));

  expect(screen.getByText(/Server Error/)).toBeInTheDocument();
});
