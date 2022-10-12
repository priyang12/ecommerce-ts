import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";

//components
import AdminProducts from "../AdminProducts";
//data
import { Products } from "../Testdata/Data";
import { Wrapper } from "../../TestSetup";

const mock = new MockAdapter(axios);

const Setup = () => {
  return render(
    <Wrapper>
      <MemoryRouter>
        <AdminProducts />
      </MemoryRouter>
    </Wrapper>
  );
};

it("Load Products", async () => {
  const data = {
    products: Products,
  };
  mock.onGet("/api/products/all").reply(200, data);

  Setup();
  //wait for loading
  await waitFor(() => {
    expect(screen.getByTestId("Loading")).toBeInTheDocument();
  });

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  for (let i = 0; i < Products.length; i++) {
    expect(screen.getByText(Products[i].name)).toBeInTheDocument();
    //image
    expect(screen.getByAltText(Products[i].name)).toBeInTheDocument();
  }
  mock.resetHandlers();
});

it("No Products", async () => {
  mock.onGet("/api/products/all").reply(200, []);
  Setup();

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  expect(screen.getByText(/No Products/)).toBeInTheDocument();
  mock.resetHandlers();
});

it("Delete Product", async () => {
  mock.onGet("/api/products/all").reply(200, {
    products: Products,
  });

  //copy the products array
  const NewProducts = [...Products];
  const DeletedProduct = NewProducts.pop();

  const Name = DeletedProduct?.name || "";

  mock.onDelete(`/api/products/product/${DeletedProduct?._id}`).reply(200, {
    msg: `${Name} deleted successfully`,
  });

  Setup();

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  expect(screen.getByText(Products[0].name)).toBeInTheDocument();

  //delete product
  const deleteButton = screen.getAllByText("Delete");

  deleteButton[2].click();

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products is deleted
  expect(screen.getByText(/iPhone deleted successfully/)).toBeInTheDocument();
  mock.resetHandlers();
});

it("Redirect to Update Product Page on Success of New Product", async () => {
  mock.onGet("/api/products/all").reply(200, Products);

  mock.onPost("/api/products").reply(200, {
    msg: "Product added successfully",
    product: Products[0],
  });

  Setup();

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //add new product
  const addNewProductButton = screen.getByText("Add New Product");
  addNewProductButton.click();

  //wait for loading to finish
  expect(screen.getByText(/ Redirecting/)).toBeInTheDocument();

  mock.resetHandlers();
});
