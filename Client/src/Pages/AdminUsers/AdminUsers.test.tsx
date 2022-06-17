import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import AdminUsers from ".";
import { client, Wrapper } from "../../TestSetup";
import { MockedUsers } from "../Testdata/Data";

const Mock = (): MockAdapter => {
  const mock = new MockAdapter(axios);
  mock.onGet("/api/users/admin/all").reply(200, MockedUsers);
  mock.onDelete(`/api/users/admin/${MockedUsers[0]._id}`).reply(200, {
    message: "User Removed",
  });
  return mock;
};

const Setup = (): ReturnType<typeof render> =>
  render(
    <Wrapper>
      <AdminUsers />
    </Wrapper>
  );

it("Render Users", async () => {
  Mock();
  Setup();
  await waitForElementToBeRemoved(() => screen.queryByTestId("Loading"));
  MockedUsers.forEach((user) => {
    expect(screen.getAllByText(user.name)[0]).toBeInTheDocument();
    expect(screen.getAllByText(user.email)[0]).toBeInTheDocument();
  });
});

it("Delete User", async () => {
  Setup();
  const user = MockedUsers[0];
  const button = screen.getByTestId(`remove-user-${user._id}`);
  userEvent.click(button);

  await waitFor(() => {
    expect(screen.getByText(/User Removed/)).toBeInTheDocument();
  });
});

it('Render "No Users"', async () => {
  const CustomMock = Mock();
  client.clear();
  CustomMock.onGet("/api/users/admin/all").reply(200, []);
  Setup();
  await waitForElementToBeRemoved(() => screen.queryByTestId("Loading"));
  expect(screen.getByText(/No Users/)).toBeInTheDocument();
});

it('Render "Server Error"', async () => {
  const CustomMock = Mock();
  client.clear();
  CustomMock.onGet("/api/users/admin/all").reply(500);
  Setup();
  await waitForElementToBeRemoved(() => screen.queryByTestId("Loading"));
  expect(screen.getByText(/Server Error/)).toBeInTheDocument();
});
