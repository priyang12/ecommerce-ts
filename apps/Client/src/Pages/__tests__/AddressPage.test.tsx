import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createMemoryHistory } from "history";
import { Router } from "react-router-dom";
import "@testing-library/jest-dom";

//components
import AddressPage from "../AddressPage";
import { Address } from "../../interfaces";

it("Do not Submit on inValid", () => {
  const history = createMemoryHistory();
  const cart: any = [
    {
      name: "Test",
    },
  ];
  localStorage.setItem("cart", cart);
  render(
    <Router history={history}>
      <AddressPage />
    </Router>
  );
  userEvent.click(screen.getByText(/Continue/i));
});

it("Store Address in Local Storage", () => {
  const history = createMemoryHistory();
  const cart: any = [
    {
      name: "Test",
    },
  ];
  localStorage.setItem("cart", cart);
  render(
    <Router history={history}>
      <AddressPage />
    </Router>
  );
  const address: Address = {
    address: "Pipload",
    city: "Surat",
    postalcode: "456123",
  };
  userEvent.type(screen.getByLabelText(/address/i), address.address);
  userEvent.type(screen.getByLabelText(/city/i), address.city);
  userEvent.type(screen.getByLabelText(/Postal Code/i), address.postalcode);

  userEvent.click(screen.getByText(/Continue/i));
  expect(JSON.parse(localStorage.address)).toStrictEqual(address);
});
