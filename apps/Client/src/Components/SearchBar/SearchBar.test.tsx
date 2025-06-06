import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";

const setup = () =>
  render(
    <BrowserRouter>
      <SearchBar searchedValue="" />
    </BrowserRouter>
  );

it("Should not search when value is empty", async () => {
  setup();
  const Input = screen.getByPlaceholderText("Search Product");
  fireEvent.keyUp(Input, {
    key: "Enter",
    charCode: 13,
    code: 13,
  });
});

it("Should not search when value is empty", async () => {
  setup();
  const Input = screen.getByPlaceholderText("Search Product");
  await userEvent.type(Input, "Iphone");
  fireEvent.keyUp(Input, {
    key: "Enter",
    charCode: 13,
    code: 13,
  });
  expect(window.location.pathname).toMatch("/search/Iphone");
});
