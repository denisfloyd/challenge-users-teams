import { useState, useEffect } from "react";

import { Team, getTeams, useTeams } from "@/services/hooks/useTeams";

import { Loading } from "@/components/widgets/LoadingState";
import { GetServerSideProps } from "next";

import { Header } from "@/components/widgets/Header";
import Link from "next/link";
import { useSearch } from "@/hooks/useSearch";
import { Input } from "@/components/elements/Input";

import Container, { ErrorMessage, ListContainer, TeamCard } from "./styles";

interface TeamListProps {
  teams: Team[];
}

export default function TeamList({ teams: teamsServer }: TeamListProps) {
  const { data, isLoading, isFetching, error } = useTeams(teamsServer);

  const [teams, setTeams] = useState<Team[]>(teamsServer);

  const filterTeams = (filterText: string) => {
    return data?.filter((team) => {
      return team.name.toLowerCase().includes(filterText.toLowerCase());
    });
  };

  const {
    inputSearch,
    setInputSearch,
    loading: loadingSearching,
    result: resultSearching,
  } = useSearch(filterTeams);

  useEffect(() => {
    if (resultSearching) {
      if (inputSearch) {
        setTeams(resultSearching);
      } else if (data) {
        setTeams(data);
      }
    }
  }, [resultSearching, data]);

  return (
    <>
      {(isLoading || isFetching) && <Loading />}

      <Container>
        <Header title="Teams" />

        <Input value={inputSearch} onChange={setInputSearch} />

        {loadingSearching && <span>Loading ...</span>}

        {error || !data ? (
          <ErrorMessage>
            Get team data returned with error: {error}
          </ErrorMessage>
        ) : (
          <>
            <ListContainer>
              {teams.map((team) => (
                <Link key={team.id} href={`/teams/${team.id}`} passHref>
                  <TeamCard>{team.name}</TeamCard>
                </Link>
              ))}
            </ListContainer>

            {!!inputSearch && resultSearching?.length === 0 && (
              <span>No Results...</span>
            )}
          </>
        )}
      </Container>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<
  TeamListProps
> = async () => {
  const teams = (await getTeams()) as Team[];
  return { props: { teams } };
};
