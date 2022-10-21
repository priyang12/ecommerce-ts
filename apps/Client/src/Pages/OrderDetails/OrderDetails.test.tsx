import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";

import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createMemoryHistory } from "history";
import { Route, Router, Routes } from "react-router-dom";
import { Wrapper } from "../../TestSetup";

// component: OrderDetails
import OrderDetails from "./OrderDetails";

// Mock Data
import { MockedOrderDetails } from "../Testdata/Data";

const Mock = new MockAdapter(axios);

afterAll(() => {
  Mock.resetHandlers();
});

const route = "/OrderStatus/61d1fdcc78d91ad851125bb8";
const History = createMemoryHistory({ initialEntries: [route] });

Mock.onGet("/api/orders/order/61d1fdcc78d91ad851125bb8").reply(
  200,
  MockedOrderDetails
);

const Setup = () =>
  render(
    <Wrapper>
      <Router navigator={History} location={route}>
        <Routes>
          <Route path="/OrderStatus/:id" element={<OrderDetails />} />
        </Routes>
      </Router>
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
