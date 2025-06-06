import { render, screen, waitFor } from "@testing-library/react";
import { createMemoryHistory } from "history";
import { Route, Router, Routes } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

//Component: Search
import Search from ".";
import { SerachResult } from "../Testdata/Data";
import { Wrapper } from "../../TestSetup";

const mock = new MockAdapter(axios);

const Setup = (History: any, route: string, path: string) => {
  render(
    <Wrapper>
      <Router navigator={History} location={route}>
        <Routes>
          <Route path={path} element={<Search />} />
        </Routes>
      </Router>
    </Wrapper>
  );
};

it("Check For Url without Page", async () => {
  const keyword = "Playstation";
  const route = `/search/${keyword}`;
  const History = createMemoryHistory({ initialEntries: [route] });

  mock.onGet(`/api/products/?keyword=${keyword}`).reply(200, SerachResult);

  await Setup(History, route, "/search/:keyword");

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

it("Show Pagination", async () => {
  const keyword = "Playstation";
  const route = `/search/${keyword}/2`;
  const History = createMemoryHistory({ initialEntries: [route] });

  const current = { ...SerachResult, pages: 3, page: 2 };

  mock.onGet(`/api/products/?keyword=Playstation&page=2`).reply(200, current);

  const NextData = { ...SerachResult, pages: 3, page: 3 };

  mock.onGet(`/api/products/?keyword=Playstation&page=3`).reply(200, NextData);

  Setup(History, route, "/search/:keyword/:pageNumber");

  await waitFor(() => {
    expect(
      screen.getByText(/Search Results for Playstation/)
    ).toBeInTheDocument();
  });

  const Prev = screen.getByText("Previous");
  const Next = screen.getByText("Next");

  Next.click();
  //Check Location on next click

  await waitFor(() => {
    expect(History.location.pathname).toMatch(`/${keyword}/3`);
  });

  Prev.click();

  //Check Location on prev click
  expect(History.location.pathname).toMatch(`/${keyword}/1`);
});

it("Pagination not exist", async () => {
  const keyword = "Playstation";
  const route = `/search/${keyword}/1`;
  const History = createMemoryHistory({ initialEntries: [route] });

  const newResult = { ...SerachResult, pages: 1 };

  mock.onGet(`/api/products/?keyword=Playstation&page=1`).reply(200, newResult);

  Setup(History, route, "/search/:keyword/:pageNumber");

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
