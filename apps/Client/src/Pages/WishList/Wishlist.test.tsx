import {
  screen,
  render,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import { act } from "react";
import { Wrapper } from "../../TestSetup";
import { Products } from "../Testdata/Data";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { queryClient } from "../../Utils/query";
import Wishlist from "./Wishlist";

const mock = new MockAdapter(axios);
queryClient.setQueryData("wishList", {
  products: Products,
});

const setup = () => {
  render(
    <Wrapper>
      <Wishlist />
    </Wrapper>
  );
};

it("Render WishList", async () => {
  mock.onGet("/api/wishlist").reply(200, {
    products: Products,
  });
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
  mock.onGet("/api/wishlist").reply(200, {
    products: Products,
  });
  mock.onDelete(`/api/wishlist/${Products[0]._id}`).reply(200, {
    msg: "Product Deleted",
  });

  await act(() => {
    setup();
  });

  await waitFor(() => screen.findByAltText(Products[0].name));

  expect(screen.getByText("Wishlist")).toBeInTheDocument();

  const deleteButton = screen.getByTestId(`Delete-${Products[0]._id}`);

  await userEvent.click(deleteButton);

  await waitFor(() =>
    expect(screen.getByText(/Product Deleted/)).toBeInTheDocument()
  );
});

it("Delete Error", async () => {
  mock.onGet("/api/wishlist").reply(200, {
    products: Products,
  });
  mock.onDelete(`/api/wishlist/${Products[0]._id}`).reply(501, {
    msg: "Server Error",
  });
  await act(() => {
    setup();
  });

  await waitFor(() => screen.findByAltText(Products[0].name));

  const deleteButton = screen.getByTestId(`Delete-${Products[0]._id}`);

  await userEvent.click(deleteButton);

  await waitFor(() =>
    expect(
      screen.getByText(/Server Problem Please try again later/)
    ).toBeInTheDocument()
  );
});

it('Render "No Products in WishList" when WishList is empty', async () => {
  mock.onGet("/api/wishlist").reply(200, {
    products: [],
  });
  setup();
  await waitFor(() =>
    expect(screen.getByText("No Products in WishList")).toBeInTheDocument()
  );
});
