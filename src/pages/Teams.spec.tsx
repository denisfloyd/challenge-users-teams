import React from "react";

import { render, fireEvent, waitFor, act, screen } from "@/tests/test-utils";

import AxiosMock from "axios-mock-adapter";

import { api } from "@/services/apiClient";

import TeamList, { getServerSideProps } from "@/pages/index";

const apiMock = new AxiosMock(api);

const teams = [
  {
    id: "1",
    name: "team 1",
    teamLeadId: "1",
    teamMemberIds: ["2", "3"],
  },
  {
    id: "2",
    name: "team 2",
    teamLeadId: "4",
    teamMemberIds: ["5", "6"],
  },
];

describe("Team list page", () => {
  beforeAll(() => {
    apiMock.onGet("teams").reply(200, [...teams]);
  });

  it("it should render correctly", async () => {
    await act(async () => {
      render(<TeamList teams={teams} />);
    });

    await waitFor(() => {
      expect(screen.getByText("team 1")).toBeTruthy();
      expect(screen.getByText("team 2")).toBeTruthy();
    });
  });

  it("it should load initial data", async () => {
    const response = await getServerSideProps({} as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          teams: [...teams],
        },
      })
    );
  });

  it("it should be able to search teams with correct term", async () => {
    await act(async () => {
      render(<TeamList teams={teams} />);
    });

    const inputSearch = screen.getByPlaceholderText("Filter...");

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "team 1" } });
    });

    await waitFor(() => {
      expect(screen.getByText("team 1")).toBeInTheDocument();
      expect(screen.queryByText("team 2")).toBeNull();
    });
  });

  it("it should not be able to search teams with wrong term", async () => {
    await act(async () => {
      render(<TeamList teams={teams} />);
    });

    const inputSearch = screen.getByPlaceholderText("Filter...");

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "team 3" } });
    });

    await waitFor(() => {
      expect(screen.queryByText("team 1")).toBeNull();
      expect(screen.queryByText("team 2")).toBeNull();

      expect(screen.getByText("No Results...")).toBeInTheDocument();
    });
  });

  it("it should be able to clear search input and return previous data", async () => {
    await act(async () => {
      render(<TeamList teams={teams} />);
    });

    const inputSearch = screen.getByPlaceholderText("Filter...");

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "team 1" } });
    });

    await waitFor(() => {
      expect(screen.queryByText("team 2")).toBeNull();
    });

    act(() => {
      fireEvent.input(inputSearch, { target: { value: "" } });
    });

    await waitFor(() => {
      expect(screen.getByText("team 1")).toBeInTheDocument();
      expect(screen.getByText("team 2")).toBeInTheDocument();
    });
  });
});
