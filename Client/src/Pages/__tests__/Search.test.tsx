import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router } from "react-router-dom";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import "@testing-library/jest-dom";

//Component: Search
import Search from "../Search";
import { SerachResult } from "../Testdata/Data";
import { Wrapper } from "../../TestSetup";
import userEvent from "@testing-library/user-event";

const mock = new MockAdapter(axios);

it("Check For Url without Page", async () => {
  const keyword = "Playstation";
  const route = `/search/name=${keyword}`;
  const History = createMemoryHistory({ initialEntries: [route] });

  mock.onGet(`/api/products/?keyword=${keyword}`).reply(200, SerachResult);
  render(
    <Wrapper>
      <Router history={History}>
        <Route path="/search/name=:keyword">
          <Search />
        </Route>
      </Router>
    </Wrapper>
  );

  await waitFor(() => {
    expect(
      screen.getByText(/Search Results for Playstation/)
    ).toBeInTheDocument();
  });

  //Check Title for Search Page
  expect(screen.getByText(`Search Results for ${keyword}`)).toBeInTheDocument();
  //Check Search Result
  expect(
    screen.getByText(/Sony Playstation 4 Pro White Version/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Airpods Wireless Bluetooth Headphones/)
  ).toBeInTheDocument();
  expect(screen.getByText(/iPhone/)).toBeInTheDocument();

  //Check Pagination Not Available
  const Pagination = screen.queryByText("Previous");
  expect(Pagination).toBeNull();

  mock.resetHandlers();
});

it("Pagination not exist", async () => {
  const keyword = "Playstation";
  const route = `/search/name=${keyword}/2`;
  const History = createMemoryHistory({ initialEntries: [route] });

  const newResult = { ...SerachResult, pages: 2 };

  mock.onGet(`/api/products/?keyword=Playstation&page=2`).reply(200, newResult);

  render(
    <Wrapper>
      <Router history={History}>
        <Route path="/search/name=:keyword/:pageNumber">
          <Search />
        </Route>
      </Router>
    </Wrapper>
  );

  await waitFor(() => {
    expect(
      screen.getByText(/Search Results for Playstation/)
    ).toBeInTheDocument();
  });

  const Prev = screen.queryByText("Previous");
  const Next = screen.queryByText("Next");

  // 1 page so not Previous
  expect(Prev).not.toBeInTheDocument();
  expect(Next).not.toBeInTheDocument();
});

it("Show Pagination", async () => {
  const keyword = "Playstation";
  const route = `/search/name=${keyword}/2`;
  const History = createMemoryHistory({ initialEntries: [route] });

  let newResult = { ...SerachResult, pages: 3, page: 2 };

  mock.onGet(`/api/products/?keyword=Playstation&page=2`).reply(200, newResult);

  newResult = { ...SerachResult, pages: 3, page: 3 };
  mock.onGet(`/api/products/?keyword=Playstation&page=3`).reply(200, newResult);
  render(
    <Wrapper>
      <Router history={History}>
        <Route path="/search/name=:keyword/:pageNumber">
          <Search />
        </Route>
      </Router>
    </Wrapper>
  );

  await waitFor(() => {
    expect(
      screen.getByText(/Search Results for Playstation/)
    ).toBeInTheDocument();
  });

  const Prev: any = screen.queryByText("Previous");
  const Next: any = screen.queryByText("Next");

  expect(Prev).toBeInTheDocument();
  expect(Next).toBeInTheDocument();

  Next?.click();
  //Check Location on next click
  expect(History.location.pathname).toMatch(`/name=${keyword}/3`);

  fireEvent.click(Prev);

  //Check Location on prev click
  expect(History.location.pathname).toMatch(`/name=${keyword}/2`);
});
