import {
  render,
  screen,
  waitForElementToBeRemoved,
  waitFor,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter } from "react-router-dom";

// Mocks
import MockWishlist from "../../../FakeData/WishlistData.json";
import { Wrapper } from "../../../TestSetup";

// Component
import CartWishlist from "./CartWishList";
import { act } from "react";

const mock = new MockAdapter(axios);

const setup = () =>
  render(
    <Wrapper>
      <BrowserRouter>
        <CartWishlist />
      </BrowserRouter>
    </Wrapper>
  );

it("renders spinner while loading wishlist", () => {
  mock.onPost("/api/wishlist/filter").reply(() => new Promise(() => {}));
  act(() => {
    setup();
  });
  expect(screen.getByAltText(/loading/i)).toBeInTheDocument();
});
// add more test cases

it("renders wishlist items after loading", async () => {
  mock.onPost("/api/wishlist/filter").reply(200, MockWishlist.WishListProducts);

  setup();
  await waitForElementToBeRemoved(() => screen.getByAltText(/loading/i));

  MockWishlist.WishListProducts.products.forEach((item) => {
    expect(screen.getByText(item.product.name)).toBeInTheDocument();
    expect(
      screen.getByText(`Price : $${item.product.price}`)
    ).toBeInTheDocument();
  });
});
