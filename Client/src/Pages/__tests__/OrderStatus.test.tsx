import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import OrderStatus from "../OrderStatus";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";

const Orders = [
  {
    _id: "612894962f469f19e8ee85e8",
    totalPrice: "517",
    isDelivered: true,
    paymentMethod: "Paypal Or Debit Card",
  },
  {
    _id: "612894962f469f19e8eeasdas8",
    totalPrice: "517",
    isDelivered: false,
    paymentMethod: "Paypal Or Debit Card",
  },
  {
    _id: "612894962f469f19e8ee8asdsad8",
    totalPrice: "2000",
    isDelivered: true,
    paymentMethod: "Paypal Or Debit Card",
  },
];

const mock = new MockAdapter(axios);

afterEach(() => {
  mock.reset();
});

it("Mock Order Data", async () => {
  mock.onGet("/api/orders").reply(200, Orders);
  render(
    <Router>
      <OrderStatus />
    </Router>
  );

  //check if the loading is true
  await waitForElementToBeRemoved(screen.getByTestId("Loading")).then(() => {
    // expect(screen.getByTestId("Loading")).toBeNull(); //check if the loading is false
  });

  // Check if the Order is rendering.
  expect(
    screen.getByText("ORDER:612894962f469f19e8ee85e8")
  ).toBeInTheDocument();
});

it("Empty Order", async () => {
  mock.onGet("/api/orders").reply(200, []);
  render(
    <Router>
      <OrderStatus />
    </Router>
  );

  //check if the loading is true
  await waitForElementToBeRemoved(screen.getByTestId("Loading")).then(() => {
    // expect(screen.getByTestId("Loading")).toBeNull(); //check if the loading is false
  });

  // Check if the Order is Empty.
  expect(screen.getByText("No Order Are In Place")).toBeInTheDocument();
});

it("Server Error", async () => {
  mock.onGet("/api/orders").reply(500);
  render(
    <Router>
      <OrderStatus />
    </Router>
  );

  //check if the loading is true
  await waitForElementToBeRemoved(screen.getByTestId("Loading")).then(() => {});

  //Check if the Error Message is rendered.
  expect(
    screen.getByText("Request failed with status code 500")
  ).toBeInTheDocument();
});
