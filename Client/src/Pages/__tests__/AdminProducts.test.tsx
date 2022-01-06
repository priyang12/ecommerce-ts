import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";

//components
import AdminProducts from "../AdminProducts";
//data
import { Products } from "../Testdata/Data";

const mock = new MockAdapter(axios);

it("Load Products", async () => {
  mock.onGet("/api/products").reply(200, Products);
  render(<AdminProducts />);

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
  }
});

it("No Products", async () => {
  mock.onGet("/api/products").reply(200, []);
  render(<AdminProducts />);

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  expect(screen.getByText(/No products/)).toBeInTheDocument();
});

it("Delete Product", async () => {
  mock.onGet("/api/products").reply(200, Products);
  const ProductToDelete = Products[0];
  const DeletedProducts = Products.pop();
  mock.onDelete(`/api/products/product/${ProductToDelete._id}`).reply(200, {
    msg: "Product deleted successfully",
    product: DeletedProducts,
  });

  render(<AdminProducts />);

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  expect(screen.getByText(ProductToDelete.name)).toBeInTheDocument();

  //delete product
  const deleteButton = screen.getAllByText("Delete");
  deleteButton[0].click();

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products is deleted
  expect(screen.queryByText(ProductToDelete.name)).not.toBeInTheDocument();
});

it("Redirect to Update Product Page on Success of New Page", async () => {
  mock.onGet("/api/products").reply(200, Products);
  mock.onPost("/api/products").reply(200, {
    msg: "Product added successfully",
    product: Products,
  });
  const history: any = {
    push: jest.fn(),
  };
  render(<AdminProducts />);

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //add new product
  const addNewProductButton = screen.getByText("Add New Product");
  addNewProductButton.click();

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  expect(screen.getByText(/Add New Product/)).toBeInTheDocument();

  //Redirect to Update Page
  await waitFor(() => {
    expect(history.push).toHaveBeenCalledWith(
      `/adminProducts/${Products[0]._id}`
    );
  });
});
