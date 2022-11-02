import {
  fireEvent,
  render,
  screen,
  waitFor,
  act,
} from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Router, Route, Routes } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import { Products } from "../Testdata/Data";
import { UserReviews } from "../../FakeData/ReviewData.json";
import { Wrapper } from "../../TestSetup";
import { AuthContext } from "../../Context/Authentication/AuthContext";

//Component
import SingleProduct from "./index";

const product = Products[0];

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const route = `/product/${product._id}`;
const history = createMemoryHistory({ initialEntries: [route] });

const Setup = () => {
  localStorage.setItem("token", "asdasdasdasd");
  const dispatch = jest.fn();

  mock.onGet(`/api/products/product/${product._id}`).reply(200, product);

  mock
    .onGet("/api/products", {
      params: {
        perPage: 6,
        sort: "rating",
        filter: JSON.stringify({
          brand: product.brand,
        }),
      },
    })
    .reply(200, { products: Products });

  mock
    .onGet("/api/products", {
      params: {
        perPage: 6,
        sort: "rating",
        filter: JSON.stringify({
          category: product.category,
        }),
      },
    })
    .reply(200, { products: Products });

  render(
    <AuthContext.Provider
      value={{
        state: {
          token: "123123",
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
    expect(screen.getAllByText(product.name)[0]).toBeInTheDocument();
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
    expect(screen.getAllByText(product.name)[0]).toBeInTheDocument();
  });
  mock.onPost("/api/cart").reply(401, {
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
    expect(screen.getAllByText(product.name)[0]).toBeInTheDocument();
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

it("Redirect on Suggested Product", async () => {
  await act(() => {
    Setup();
  });
  const BradProduct = screen.getByTestId(`brand-${Products[0]._id}`);

  fireEvent.keyDown(BradProduct, {
    key: "Enter",
    charCode: 13,
    code: 13,
  });

  expect(history.location.pathname).toMatch(`/product/${Products[0]._id}`);
});

it("Redirect on Suggested Product", async () => {
  await act(() => {
    Setup();
  });
  const CateProduct = screen.getByTestId(`category-${Products[0]._id}`);

  fireEvent.keyDown(CateProduct, {
    key: "Enter",
    charCode: 13,
    code: 13,
  });

  expect(history.location.pathname).toMatch(`/product/${Products[0]._id}`);
});

it("Reviews", async () => {
  mock.onGet(`/api/reviews/ProductId/${product._id}`).reply(201, UserReviews);
  await act(() => {
    Setup();
  });

  await waitFor(() =>
    expect(screen.getByText(UserReviews[0].comment)).toBeInTheDocument()
  );
});
it("No Reviews", async () => {
  mock.onGet(`/api/reviews/ProductId/${product._id}`).reply(201, []);
  await act(() => {
    Setup();
  });

  await waitFor(() =>
    expect(screen.getByText("No Reviews")).toBeInTheDocument()
  );
});
