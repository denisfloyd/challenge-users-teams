import { wrapper } from "@/tests/test-utils";
import { renderHook } from "@testing-library/react-hooks";
import AxiosMock from "axios-mock-adapter";

import { api } from "@/services/apiClient";

import { useTeams } from "./useTeams";
import { queryClient } from "../queryClient";

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

describe("UseTeams react-query hook util", () => {
  beforeAll(() => {
    apiMock.onGet("teams").reply(200, [...teams]);
  });

  it("it should get teams data", async () => {
    const { result, waitFor } = renderHook(() => useTeams(), { wrapper });

    await waitFor(() => result.current.isSuccess);
    expect(result.current.data).toEqual(teams);

    queryClient.refetchQueries("teams");
    await waitFor(() => expect(result.current.isRefetching).toBeTruthy());
  });

  it("it should return null when we had error status response", async () => {
    apiMock.onGet("teams").reply(401);
    const { result, waitFor } = renderHook(() => useTeams(), { wrapper });

    queryClient.refetchQueries("teams");
    await waitFor(() => result.current.isRefetching);
    await waitFor(() => !result.current.isRefetching);

    expect(result.current.data).toBeNull();
  });
});
