import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import Auth from "./Auth";

const setup = () =>
  render(
    <BrowserRouter>
      <Auth />
    </BrowserRouter>
  );

it("Login on init", () => {
  setup();
  expect(screen.getByDisplayValue(/login/i)).toBeInTheDocument();
});
