import { useState } from "react";

import { Team, getTeams, useTeams } from "@/services/hooks/useTeams";

import { Loading } from "@/components/widgets/LoadingState";
import { GetServerSideProps } from "next";

import { Container, ErrorMessage, ListContainer, TeamCard } from "./styles";
import { Header } from "@/components/widgets/Header";
import Link from "next/link";

interface TeamListProps {
  teams: Team[];
}

export default function TeamList({ teams }: TeamListProps) {
  const [isFetchingData, setIsFetchingData] = useState<boolean>(false);

  const { data, isLoading, isFetching, error } = useTeams(teams);

  return (
    <>
      {(isLoading || isFetchingData || isFetching) && <Loading />}

      <Container>
        <Header title="Teams" />

        {error || !data ? (
          <ErrorMessage>
            Get team data returned with error: {error}
          </ErrorMessage>
        ) : (
          <ListContainer>
            {data.map((team) => (
              <Link key={team.id} href={`/teams/${team.id}`} prefetch>
                <TeamCard>{team.name}</TeamCard>
              </Link>
            ))}
          </ListContainer>
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
