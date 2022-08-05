import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
import { AuthContext } from "../../Context/Authentication/AuthContext";
import { Wrapper } from "../../TestSetup";

// component: OrderDetails
import OrderDetails from "../OrderDetails";

// Mock Data
import { MockedOrderDetails } from "../Testdata/Data";

const Mock = new MockAdapter(axios);

afterAll(() => {
  Mock.resetHandlers();
});

const route = "/OrderStatus/61d1fdcc78d91ad851125bb8";
const history = createMemoryHistory({ initialEntries: [route] });

Mock.onGet("/api/orders/order/61d1fdcc78d91ad851125bb8").reply(
  200,
  MockedOrderDetails
);

const Setup = () =>
  render(
    <Wrapper>
      <AuthContext.Provider
        value={{
          state: {
            loading: false,
            err: null,
            token: null,
            user: {
              ...MockedOrderDetails.user,
              isAdmin: true,
              createdAt: "2020-05-06T13:41:00.000Z",
            },
          },
          // eslint-disable-next-line @typescript-eslint/no-empty-function
          dispatch: () => {},
        }}
      >
        <Router history={history}>
          <Route path="/OrderStatus/:id">
            <OrderDetails />
          </Route>
        </Router>
      </AuthContext.Provider>
    </Wrapper>
  );

it("Render OrderDetails", async () => {
  Setup();
  await waitForElementToBeRemoved(screen.queryByTestId("Loading"));

  screen.getByText(MockedOrderDetails.user.name);
  screen.getByText(MockedOrderDetails.user.name);
  screen.getByText(`$${MockedOrderDetails.itemsPrice}`);
  screen.getByText(`$${MockedOrderDetails.shippingPrice}`);
  screen.getByText(`$${MockedOrderDetails.taxPrice}`);
  screen.getByText(`$${MockedOrderDetails.totalPrice}`);
});

it("Mark Order as Delivered", async () => {
  Setup();
  Mock.resetHandlers();
  Mock.onPut("/api/orders/order/61d1fdcc78d91ad851125bb8").reply(200, {
    msg: "Order Delivered",
  });
  Mock.onGet("/api/orders/order/61d1fdcc78d91ad851125bb8").reply(200, {
    ...MockedOrderDetails,
    isDelivered: true,
  });
  const button = screen.getByText(/Mark as Delivered/i);
  userEvent.click(button);

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  expect(screen.getByText(/Order Delivered/i)).toBeInTheDocument();
});
