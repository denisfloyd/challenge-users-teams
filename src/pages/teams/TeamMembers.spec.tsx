import { useRouter } from "next/router";

import { render, act, waitFor, screen, fireEvent } from "@/tests/test-utils";
import { mocked } from "jest-mock";

import TeamMembers, { getStaticProps } from "@/pages/teams/[slug]";

import AxiosMock from "axios-mock-adapter";
import { api } from "@/services/apiClient";

const apiMock = new AxiosMock(api);

const mockedRouterReplace = jest.fn();
jest.mock("next/router");

const team = {
  id: "1",
  name: "team 1",
  teamLeadId: "1",
  teamMemberIds: ["2", "3"],
};

const members = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    displayName: "John_Doe",
    location: "London",
    isLeader: true,
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Doe",
    displayName: "Jane_Doe",
    location: "Paris",
  },
  {
    id: "3",
    firstName: "Thomas",
    lastName: "Smith",
    displayName: "Thomas_Smith",
    location: "Chicago",
  },
];

describe("Team members page", () => {
  beforeEach(() => {
    mocked(useRouter).mockReturnValue({
      isFallback: false,
      replace: mockedRouterReplace,
    } as any);
  });

  it("it should render correctly", async () => {
    await act(async () => {
      render(<TeamMembers team={team} members={members} />);
    });

    await waitFor(() => {
      expect(screen.getByText("Team team 1")).toBeInTheDocument();
      expect(screen.getByText("John_Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane_Doe")).toBeInTheDocument();
      expect(screen.getByText("Thomas_Smith")).toBeInTheDocument();
    });
  });

  it("it should load initial data", async () => {
    apiMock.onGet("teams/1").reply(200, team);
    apiMock.onGet("users/1").reply(200, members[0]);
    apiMock.onGet("users/2").reply(200, members[1]);
    apiMock.onGet("users/3").reply(200, members[2]);

    const response = await getStaticProps({ params: { slug: "1" } });

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          team,
          members,
        },
      })
    );
  });

  it("it should be able to redirect to main page when it does not got team data", async () => {
    apiMock.onGet("teams/1").reply(401);

    const response = await getStaticProps({ params: { slug: "wrong" } });

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      })
    );
  });

  it("it should be able to search team members with correct term", async () => {
    await act(async () => {
      render(<TeamMembers team={team} members={members} />);
    });

    const inputSearch = screen.getByPlaceholderText("Filter...");

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "John" } });
    });

    await waitFor(() => {
      expect(screen.getByText("John_Doe")).toBeInTheDocument();
      expect(screen.queryByText("Jane_Doe")).toBeNull();
    });
  });

  it("it should be able to clear search input and return previous data", async () => {
    await act(async () => {
      render(<TeamMembers team={team} members={members} />);
    });

    const inputSearch = screen.getByPlaceholderText("Filter...");

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "John" } });
    });

    await waitFor(() => {
      expect(screen.queryByText("Jane_Doe")).toBeNull();
    });

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "" } });
    });

    await waitFor(() => {
      expect(screen.getByText("John_Doe")).toBeInTheDocument();
      expect(screen.getByText("Jane_Doe")).toBeInTheDocument();
      expect(screen.getByText("Thomas_Smith")).toBeInTheDocument();
    });
  });

  it("it should be able to go back to main page", async () => {
    await act(async () => {
      render(<TeamMembers team={team} members={members} />);
    });

    const buttonBack = screen.getByTestId("button-back");

    act(() => {
      fireEvent.click(buttonBack);
    });

    await waitFor(() => {
      expect(mockedRouterReplace).toHaveBeenCalled();
    });
  });
});
