import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import NotFound from "./NotFound";

it("render Default NotFound", () => {
  render(
    <BrowserRouter>
      <NotFound />
    </BrowserRouter>
  );
  expect(screen.getByText(/404 Not Found/)).toBeInTheDocument();
  expect(screen.getByText(/does not exist/)).toBeInTheDocument();
  expect(screen.getByText(/home page/)).toBeInTheDocument();
});

it("render NotFound with props", () => {
  const data = {
    heading: "are you lost?",
    message: "can not find the page",
    link: "Go to the different page",
  };
  render(
    <BrowserRouter>
      <NotFound data={data} />
    </BrowserRouter>
  );
  expect(screen.getByText(data.heading)).toBeInTheDocument();
  expect(screen.getByText(data.message)).toBeInTheDocument();
  expect(screen.getByText(data.link)).toBeInTheDocument();
});
