import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//Component
import SingleProduct from "../SingleProduct";
import { AuthContext } from "../../Context/AuthContext";

const product = {
  rating: 4,
  numReviews: 1,
  price: 89.99,
  countInStock: 10,
  _id: "60d5e622e5179e2bb44bd838",
  name: "Airpods Wireless Bluetooth Headphones",
  image: "/Photos/image-1627384388351.webp",
  description:
    "Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working",
  brand: "Apple",
  category: "Electronics",
  user: "60d5e622e5179e2bb44bd835",
  reviews: [
    {
      _id: "6128b73ebc70bc35a0b0c3d0",
      name: "Priyang",
      rating: 4,
      comment: "very good",
      user: "6106f4c09d285d000436ed0a",
      createdAt: "2021-08-27T09:58:22.657Z",
      updatedAt: "2021-08-27T09:58:22.657Z",
    },
  ],
};

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});
const route = "/product/123123";
const history = createMemoryHistory({ initialEntries: [route] });

it("Mock Fetch Product Details", async () => {
  mock.onGet("/api/products/product/123123").reply(200, product);
  render(
    <Router history={history}>
      <Route path='/product/:id'>
        <SingleProduct />
      </Route>
    </Router>
  );
  await waitFor(() => {
    expect(
      screen.getByText(/Airpods Wireless Bluetooth Headphones/)
    ).toBeInTheDocument();
  });

  //Check for Review
  expect(screen.getByText(/REVIEWS/)).toBeInTheDocument();
});

it("Check SnapShot of Order", async () => {
  mock.onGet("/api/products/product/123123").reply(200, product);
  const { asFragment } = render(
    <Router history={history}>
      <Route path='/product/:id'>
        <SingleProduct />
      </Route>
    </Router>
  );
  await waitFor(() => {
    expect(
      screen.getByText(/Airpods Wireless Bluetooth Headphones/)
    ).toBeInTheDocument();
  });

  expect(asFragment()).toMatchSnapshot();
});

it("Mock Add to Cart", async () => {
  mock.onGet("/api/products/product/123123").reply(200, product);

  localStorage.setItem("token", "123123");

  render(
    <Router history={history}>
      <Route path='/product/:id'>
        <SingleProduct />
      </Route>
    </Router>
  );

  await waitFor(() => {
    expect(
      screen.getByText(/Airpods Wireless Bluetooth Headphones/)
    ).toBeInTheDocument();
  });
  const cartResponse = {
    msg: "Airpods Wireless Bluetooth Headphones is Added Cart",
  };
  mock.onPost("/api/cart").reply(200, cartResponse);
  userEvent.click(screen.getByText(/ADD TO CART/));

  await waitFor(() => screen.getByText(/Headphones is Added Cart/));
});
