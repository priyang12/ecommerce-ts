import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//Component
import SingleProduct from "./index";

import { Products } from "../Testdata/Data";
import { Wrapper } from "../../TestSetup";

const product = Products[0];

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const route = "/product/123123";
const history = createMemoryHistory({ initialEntries: [route] });

const Setup = () => {
  mock.onGet("/api/products/product/123123").reply(200, product);
  render(
    <Wrapper>
      <Router history={history}>
        <Route path="/product/:id">
          <SingleProduct />
        </Route>
      </Router>
    </Wrapper>
  );
};

it("Mock Fetch Product Details", async () => {
  Setup();

  await waitFor(() => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});

it("Mock Add to Cart", async () => {
  localStorage.setItem("token", "123123");

  Setup();

  await waitFor(() => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
  const cartResponse = {
    msg: `${product.name} Added Cart`,
  };
  mock.onPost("/api/cart").reply(200, cartResponse);

  userEvent.selectOptions(screen.getByLabelText(/Qty/), "2");
  userEvent.click(screen.getByText(/ADD TO CART/));

  await waitFor(() => screen.findByText(/Adding to cart/));

  const alert = screen.getByText(`${product.name} Added Cart`);
  expect(alert).toBeInTheDocument();

  setTimeout(() => {
    expect(alert).not.toBeInTheDocument();
  }, 5000);
});

it("Error on Add Cart", async () => {
  localStorage.setItem("token", "123123");
  Setup();

  await waitFor(() => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
  mock.onPost("/api/cart").reply(501, {
    msg: "Please Try Again Later",
  });

  userEvent.selectOptions(screen.getByLabelText(/Qty/), "2");
  userEvent.click(screen.getByText(/ADD TO CART/));
  await waitFor(() => screen.findByText(/Adding to cart/));
  const Error = screen.getByText(/Please Try Again Later/);
  expect(Error).toBeInTheDocument();
});

it("Add To Wishlist", async () => {
  localStorage.setItem("token", "123123");
  Setup();

  await waitFor(() => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });

  const wishlistResponse = {
    msg: `${product.name} Added Wishlist`,
  };

  mock.onPatch(`/api/wishlist/${product._id}`).reply(200, wishlistResponse);

  userEvent.click(screen.getByText(/WISHLIST/));

  await waitFor(() => screen.findByText(/Adding to wishlist/));

  const alert = screen.getByText(`${product.name} Added Wishlist`);
  expect(alert).toBeInTheDocument();
});
