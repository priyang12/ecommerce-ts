import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { Wrapper } from "../../TestSetup";
import { createMemoryHistory, MemoryHistory } from "history";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AdminUpdateProduct from "../AdminUpdateProduct";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

const initialState: any = {
  name: "Sample name",
  price: 0,
  image: "https://ik.imagekit.io/5aalo5l7bu7/sample_a81IvE0ug.webp",
  brand: "Sample brand",
  countInStock: 0,
  numReviews: 0,
  description: "Sample description",
};

const mock = new MockAdapter(axios);

const Setup = (history: MemoryHistory<unknown>) =>
  render(
    <Wrapper>
      <Router history={history}>
        <Route path="/AdminProducts/:id" exact>
          <AdminUpdateProduct />
        </Route>
      </Router>
    </Wrapper>
  );

describe("New Product", () => {
  // run before each test
  beforeEach(() => {
    const history = createMemoryHistory();
    history.push("/AdminProducts/add");
    // eslint-disable-next-line testing-library/no-render-in-setup
    Setup(history);
  });

  it("Render Add Product Page", async () => {
    expect(screen.getByText(/Add New Product/)).toBeInTheDocument();
    expect(screen.getByText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByText(/brand/i)).toBeInTheDocument();
    expect(screen.getByText(/Product Description/i)).toBeInTheDocument();

    // Image Preview
    expect(screen.getByAltText(/Product/)).toHaveAttribute(
      "src",
      initialState.image
    );
  });

  // it("Image Input should change Image Preview", async () => {
  //   const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/jpg" });

  //   const imageInput = screen.getByTestId(/UploadImage/);
  //   const imagePreview = screen.getByAltText(/Product/);
  //   await userEvent.upload(imageInput, file);
  //   const Link = window.URL.createObjectURL(file);
  //   console.log(Link);
  //   expect(imagePreview).toHaveAttribute("src", "./src/Images/product.jpg");
  // });

  it("Add New Product", async () => {
    // check for title
    mock.onPost("/api/products/add").reply(200, {
      msg: "Added Successfully",
    });
    expect(screen.getByText(/Add New Product/)).toBeInTheDocument();
    const ProductName = "Product Name";
    userEvent.type(screen.getByLabelText(/Product Name/), ProductName);

    // Click Add New Product
    userEvent.click(screen.getByText(/Add Product/i));
    await waitFor(() => screen.findByText(/added successfully/));
  });
});

describe("Update Product", () => {
  beforeEach(() => {
    mock.onGet("/api/products/product/123123").reply(200, {
      name: "Update name",
      price: 10,
      image: "https://ik.imagekit.io/5aalo5l7bu7/sample_a81IvE0ug.webp",
      brand: "Simple brand",
      countInStock: 0,
      numReviews: 0,
      description: "Sample description",
    });
    mock.onPut("/api/products/product/123123").reply(200, {
      msg: "Updated Successfully",
    });
  });
  it("Render Product Details Page", async () => {
    const history = createMemoryHistory();
    history.push("/AdminProducts/123123");
    Setup(history);

    // wait for the page to load
    await waitForElementToBeRemoved(() => screen.queryByTestId("Loading"));

    expect(screen.getByText(/Admin Update Product/)).toBeInTheDocument();

    expect(screen.getByDisplayValue(/Update name/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Simple brand/)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Sample description/)).toBeInTheDocument();
    // check image preview
    expect(screen.getByAltText(/Product/)).toHaveAttribute(
      "src",
      "https://ik.imagekit.io/5aalo5l7bu7/sample_a81IvE0ug.webp"
    );
  });

  it("Mock Update Product Call", async () => {
    const history = createMemoryHistory();
    history.push("/AdminProducts/123123");
    Setup(history);

    // wait for the page to loa
    // // Update Product
    const ProductName = "Updated name";
    userEvent.type(screen.getByLabelText(/Product Name/), ProductName);

    // Click Update Product
    userEvent.click(screen.getByText("Update Product"));
    await waitFor(() => screen.findByText(/Updated Successfully/));
  });
});
