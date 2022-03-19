import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { Router, Route } from "react-router-dom";
import { createMemoryHistory } from "history";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";

//Component
import SingleProduct from "../SingleProduct";

import { Products } from "../Testdata/Data";
import { Wrapper } from "./setup";

const product = Products[0];

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

const route = "/product/123123";
const history = createMemoryHistory({ initialEntries: [route] });

it("Mock Fetch Product Details", async () => {
  mock.onGet("/api/products/product/123123").reply(200, product);
  render(
    <Wrapper>
      <Router history={history}>
        <Route path='/product/:id'>
          <SingleProduct />
        </Route>
      </Router>
    </Wrapper>
  );
  await waitFor(() => {
    expect(screen.getByText(product.name)).toBeInTheDocument();
  });
});

// it("Mock Add to Cart", async () => {
//   mock.onGet("/api/products/product/123123").reply(200, product);

//   localStorage.setItem("token", "123123");

//   render(
//     <Router history={history}>
//       <Route path='/product/:id'>
//         <SingleProduct />
//       </Route>
//     </Router>
//   );

//   await waitFor(() => {
//     expect(
//       screen.getByText(/Airpods Wireless Bluetooth Headphones/)
//     ).toBeInTheDocument();
//   });
//   const cartResponse = {
//     msg: "Airpods Wireless Bluetooth Headphones is Added Cart",
//   };
//   mock.onPost("/api/cart").reply(200, cartResponse);
//   userEvent.click(screen.getByText(/ADD TO CART/));

//   await waitFor(() => screen.getByText(/Headphones is Added Cart/));
// });
