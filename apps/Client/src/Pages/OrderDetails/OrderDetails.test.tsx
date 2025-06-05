import {
  render,
  screen,
  waitForElementToBeRemoved,
  fireEvent,
} from "@testing-library/react";
import { act } from "react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Route, Router, Routes } from "react-router-dom";
import { Wrapper } from "../../TestSetup";

// component: OrderDetails
import OrderDetails from "./OrderDetails";
// Mock Data
import { MockedOrderDetails } from "../Testdata/Data";
import ReactModal from "react-modal";
import { queryClient } from "../../query";

const Mock = new MockAdapter(axios);

afterAll(() => {
  Mock.resetHandlers();
});

const route = "/OrderStatus/61d1fdcc78d91ad851125bb8";
const History = createMemoryHistory({ initialEntries: [route] });

const Setup = () =>
  render(
    <Wrapper>
      <Router navigator={History} location={route}>
        <Routes>
          <Route
            path="/OrderStatus/:id"
            element={
              <div id="root">
                <OrderDetails />
              </div>
            }
          />
        </Routes>
      </Router>
    </Wrapper>
  );

it("Render OrderDetails without delivered", async () => {
  Mock.onGet("/api/orders/order/61d1fdcc78d91ad851125bb8").reply(
    200,
    MockedOrderDetails
  );
  Setup();
  await waitForElementToBeRemoved(screen.queryByTestId("Loading"));
  expect(screen.getByText(MockedOrderDetails.user.name)).toBeInTheDocument();
  expect(screen.getByText(MockedOrderDetails.user.name)).toBeInTheDocument();
  expect(
    screen.getByText(`$${MockedOrderDetails.itemsPrice}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`$${MockedOrderDetails.shippingPrice}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`$${MockedOrderDetails.taxPrice}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`$${MockedOrderDetails.totalPrice}`)
  ).toBeInTheDocument();
  expect(screen.queryByText("Review Submitted")).not.toBeInTheDocument();
  expect(screen.getByText("Not Delivered")).toBeInTheDocument();
});

it("Render With delivered", async () => {
  Mock.onGet("/api/orders/order/61d1fdcc78d91ad851125bb8").reply(200, {
    ...MockedOrderDetails,
    isDelivered: true,
  });

  await act(() => {
    Setup();
  });

  expect(screen.getAllByText("Review Submitted")[0]).toBeInTheDocument();
  expect(screen.getByText("Delivered")).toBeInTheDocument();
});

it("Enter on Product", async () => {
  await act(() => {
    Setup();
  });
  await fireEvent.keyDown(
    screen.getByTestId(`orderItem-${MockedOrderDetails.orderItems[0]._id}`),
    { key: "Enter", charCode: 13, code: 13 }
  );
  expect(History.location.pathname).toMatch(
    `/product/${MockedOrderDetails.orderItems[0].product._id}`
  );
});

it("Open Order Modal", async () => {
  Mock.onGet(`/api/orders/order/${MockedOrderDetails._id}`).reply(200, {
    ...MockedOrderDetails,
    isDelivered: true,
  });
  Mock.onPost("/api/reviews", {
    params: {
      OrderID: MockedOrderDetails._id,
      ProductId: MockedOrderDetails.orderItems[0].product._id,
    },
  }).reply(200, {
    msg: "Post Reviewed",
  });
  queryClient.setQueryData(
    `orderDetails/${MockedOrderDetails._id}`,
    MockedOrderDetails
  );
  await act(() => {
    Setup();
  });
  ReactModal.setAppElement("#root");

  const ReviewBtn = screen.getByRole("button", {
    name: "Review",
  });
  await userEvent.click(ReviewBtn);

  await userEvent.type(
    screen.getByLabelText("Comment"),
    "this is a test Comment"
  );

  await userEvent.type(screen.getByLabelText("Rating"), "1");

  await userEvent.click(screen.getByText("Submit Review"));
});
