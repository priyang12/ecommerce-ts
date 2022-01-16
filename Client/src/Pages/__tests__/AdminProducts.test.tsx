import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";

//components
import AdminProducts from "../AdminProducts";
//data
import { Products } from "../Testdata/Data";

const mock = new MockAdapter(axios);

it("Load Products", async () => {
  const data = {
    products: Products,
  };
  mock.onGet("/api/products").reply(200, data);

  render(
    <MemoryRouter>
      <AdminProducts />
    </MemoryRouter>
  );

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
});

it("No Products", async () => {
  mock.onGet("/api/products").reply(200, []);
  render(<AdminProducts />);

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //check if products are loaded
  expect(screen.getByText(/No Products/)).toBeInTheDocument();
});

it("Delete Product", async () => {
  mock.onGet("/api/products").reply(200, {
    products: Products,
  });

  //copy the products array
  const NewProducts = [...Products];
  const DeletedProduct = NewProducts.pop();

  const Name = DeletedProduct?.name || "";
  console.log(DeletedProduct?._id);
  mock.onDelete(`/api/products/product/${DeletedProduct?._id}`).reply(200, {
    msg: `${Name} deleted successfully`,
    products: NewProducts,
  });

  render(
    <MemoryRouter>
      <AdminProducts />
    </MemoryRouter>
  );

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
  expect(screen.queryByText(Name)).not.toBeInTheDocument();
});

it("Redirect to Update Product Page on Success of New Product", async () => {
  mock.onGet("/api/products").reply(200, Products);

  mock.onPost("/api/products").reply(200, {
    msg: "Product added successfully",
    product: Products[0],
  });
  const history: any = {
    push: jest.fn(),
  };

  render(
    <MemoryRouter>
      <AdminProducts />
    </MemoryRouter>
  );

  //wait for loading to finish
  await waitFor(() => {
    expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  });

  //add new product
  const addNewProductButton = screen.getByText("Add New Product");
  addNewProductButton.click();

  // //wait for loading to finish
  // await waitFor(() => {
  //   expect(screen.queryByTestId("Loading")).not.toBeInTheDocument();
  // });

  // //check if products are loaded
  // expect(screen.getByText(/Add New Product/)).toBeInTheDocument();

  // //Redirect to Update Page
  // await waitFor(() => {
  //   expect(history.push).toHaveBeenCalledWith(
  //     `/adminProducts/${Products[0]._id}`
  //   );
  // });
});
