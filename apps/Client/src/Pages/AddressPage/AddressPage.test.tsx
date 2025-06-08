import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";

//components
import AddressPage from "./AddressPage";
import { Address } from "../../Types/interfaces";
import { Wrapper } from "../../TestSetup";

const cart = [
  {
    name: "Test",
  },
];
localStorage.setItem("cart", JSON.stringify(cart));

it("Do not Submit on inValid", async () => {
  render(
    <Wrapper>
      <BrowserRouter>
        <AddressPage />
      </BrowserRouter>
    </Wrapper>
  );
  await userEvent.click(screen.getByText(/Continue/i));
});

it("Store Address in Local Storage", async () => {
  render(
    <Wrapper>
      <BrowserRouter>
        <AddressPage />
      </BrowserRouter>
    </Wrapper>
  );
  const address: Address = {
    address: "Pipload",
    city: "Surat",
    postalcode: "456123",
  };
  await userEvent.type(screen.getByLabelText(/address/i), address.address);
  await userEvent.type(screen.getByLabelText(/city/i), address.city);
  await userEvent.type(
    screen.getByLabelText(/Postal Code/i),
    address.postalcode
  );

  await userEvent.click(screen.getByText(/Continue/i));
  expect(JSON.parse(localStorage.address)).toStrictEqual(address);
});
