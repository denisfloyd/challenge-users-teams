import { useQuery } from "react-query";
import { api } from "../apiClient";

export type Team = {
  id: string;
  name: string;
  teamLeadId: string;
  teamMemberIds: string[];
};

export async function getTeams(): Promise<Team[] | null> {
  try {
    const { data } = await api.get("teams");
    return data as Team[];
  } catch (err) {
    return null;
  }
}

export async function getTeam(id: string): Promise<Team | null> {
  try {
    const { data } = await api.get(`/teams/${id}`);
    return data as Team;
  } catch (e) {
    return null;
  }
}

export function useTeams(dragons?: Team[]) {
  return useQuery(["teams"], () => getTeams(), {
    staleTime: 1000 * 60 * 1, // 1 minute
    refetchOnWindowFocus: true,
    initialData: dragons,
  });
}
