import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import OrderStatus from "../OrderStatus";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { MemoryRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import { client, Wrapper } from "../../TestSetup";

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

const AdminOrders = [
  {
    _id: "612894962f469f19e8ee85e8",
    user: {
      name: "John Doe",
      email: "sdsads@gmail.com",
    },
    totalPrice: "517",
    isDelivered: true,
    paymentMethod: "Paypal Or Debit Card",
  },
  {
    _id: "612894962f469f19e8eeasdas8",
    user: {
      name: "asdasd Doe",
      email: "sdsads@gmail.com",
    },
    totalPrice: "517",
    isDelivered: false,
    paymentMethod: "Paypal Or Debit Card",
  },
  {
    _id: "612894962f469f19e8ee8asdsad8",
    user: {
      name: "Joasdasdhn Doe",
      email: "sdsads@gmail.com",
    },
    totalPrice: "2000",
    isDelivered: true,
    paymentMethod: "Paypal Or Debit Card",
  },
];

const mock = new MockAdapter(axios);

describe("User Orders", () => {
  it("Empty Order", async () => {
    mock.onGet("/api/orders").reply(200, []);
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/OrderStatus"]}>
          <OrderStatus />
        </MemoryRouter>
      </Wrapper>
    );

    //check if the loading is true
    await waitForElementToBeRemoved(screen.queryByTestId("Loading")).then(
      () => {
        // expect(screen.queryByTestId("Loading")).toBeNull(); //check if the loading is false
      }
    );

    // Check if the Order is Empty.
    expect(screen.getByText("No Order Are In Place")).toBeInTheDocument();
  });
  it("Mock Order Data", async () => {
    client.clear();
    mock.onGet("/api/orders").reply(200, Orders);
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/OrderStatus"]}>
          <OrderStatus />
        </MemoryRouter>
      </Wrapper>
    );

    //check if the loading is true
    await waitForElementToBeRemoved(screen.queryByTestId("Loading"));

    // Check if the Order is rendering.
    expect(
      screen.getByText("ORDER:612894962f469f19e8ee85e8")
    ).toBeInTheDocument();
  });

  it("Server Error", async () => {
    client.clear();
    mock.onGet("/api/orders").reply(500);
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/OrderStatus"]}>
          <OrderStatus />
        </MemoryRouter>
      </Wrapper>
    );

    //check if the loading is true
    await waitForElementToBeRemoved(screen.queryByTestId("Loading"));
    //Check if the Error Message is rendered.
    expect(
      screen.getByText("Request failed with status code 500")
    ).toBeInTheDocument();
  });
});

describe("Admin Orders", () => {
  it("Call All the Order For Admin", async () => {
    mock.onGet("/api/orders/all").reply(200, AdminOrders);
    render(
      <Wrapper>
        <MemoryRouter initialEntries={["/AdminOrders"]}>
          <OrderStatus />
        </MemoryRouter>
      </Wrapper>
    );

    //check if the loading is true
    await waitForElementToBeRemoved(screen.queryByTestId("Loading")).then(
      () => {}
    );
    //check if the loading is true
    expect(screen.getByText(/John Doe/)).toBeInTheDocument();
  });
});
