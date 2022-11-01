import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Router, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { Products } from "../Testdata/Data";
import { Wrapper } from "../../TestSetup";
import {
  AuthContext,
  AuthProvider,
} from "../../Context/Authentication/AuthContext";

//Component
import SingleProduct from "./index";

const product = Products[0];

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const route = "/product/123123";
const history = createMemoryHistory({ initialEntries: [route] });

const Setup = () => {
  localStorage.setItem("token", "asdasdasdasd");
  const dispatch = jest.fn();

  mock.onGet("/api/products/product/123123").reply(200, product);
  render(
    <AuthContext.Provider
      value={{
        state: {
          token: "asdasdasdasd",
          user: null,
          alert: null,
          loading: false,
          err: null,
        },
        dispatch,
      }}
    >
      <Wrapper>
        <Router navigator={history} location={route}>
          <Routes>
            <Route path="/product/:id" element={<SingleProduct />} />
          </Routes>
        </Router>
      </Wrapper>
    </AuthContext.Provider>
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

  await userEvent.selectOptions(screen.getByLabelText("Quantity"), "2");

  await userEvent.click(screen.getByText(/TO CART/));

  await waitFor(() => {
    expect(screen.getByText(`${product.name} Added Cart`)).toBeInTheDocument();
  });
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

  await userEvent.selectOptions(screen.getByLabelText("Quantity"), "2");
  await userEvent.click(screen.getByText(/TO CART/));

  await waitFor(() => {
    expect(screen.getByText(/Please Try Again Later/)).toBeInTheDocument();
  });
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

  await userEvent.click(screen.getByText("WISH LIST"));

  await waitFor(() => {
    expect(
      screen.getByText(`${product.name} Added Wishlist`)
    ).toBeInTheDocument();
  });
});
