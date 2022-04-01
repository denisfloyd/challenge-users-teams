import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { IoMdBackspace } from "react-icons/io";

import { getTeam, Team } from "@/services/hooks/useTeams";
import { api } from "@/services/apiClient";

import Button from "@/components/elements/Button";
import { Header } from "@/components/widgets/Header";

import { Loading } from "@/components/widgets/LoadingState";

import {
  Container,
  ListContainer,
  UserCard,
  LoadingMembersFallback,
} from "./styles";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  location: string;
}

interface TeamMembersProps {
  team: Team;
  teamLeader: User;
}

export default function TeamMembers({ team, teamLeader }: TeamMembersProps) {
  const router = useRouter();

  const [members, setMembers] = useState<User[]>([teamLeader]);

  function handleClickBack() {
    router.replace("/teams");
  }

  const { data: membersFromBrowserFetch, isLoading } = useQuery(
    ["team", team.id],
    async () => {
      const members: User[] = [];

      for (let index = 0; index < team.teamMemberIds.length; index++) {
        const res: User = await new Promise(async (resolve) => {
          return api.get(`/users/${team.teamMemberIds[index]}`).then((res) => {
            resolve(res.data);
          });
        });

        members.push(res as any);
      }

      return members;
    },
    {
      refetchOnWindowFocus: true,
      staleTime: 1000 * 60 * 10, // 10 minutes
    }
  );

  useEffect(() => {
    if (membersFromBrowserFetch) {
      setMembers([teamLeader, ...membersFromBrowserFetch]);
    }
  }, [teamLeader, membersFromBrowserFetch]);

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Container>
      <Button onClick={handleClickBack} data-testid="button-back">
        <IoMdBackspace />
        Voltar
      </Button>

      <Header title={`Team ${team.name}`} />

      <ListContainer>
        {members.map((member, index) => (
          <UserCard key={member.id} isLeader={index === 0}>
            <h3>{member.displayName}</h3>
            <span>
              {member.firstName} {member.lastName}
            </span>
            <p>Location: {member.location}</p>
          </UserCard>
        ))}

        {isLoading && (
          <LoadingMembersFallback>Loading ...</LoadingMembersFallback>
        )}
      </ListContainer>
    </Container>
  );
}

export const getStaticPaths = () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as ParsedUrlQuery;

  const team = await getTeam(String(slug));

  if (team) {
    const { teamLeadId, teamMemberIds, name } = team;
    const teamLeaderResponse = await api.get<User>(`users/${teamLeadId}`);

    return {
      props: {
        team,
        teamLeader: teamLeaderResponse.data,
      },
      revalidate: 60 * 30, // 30 minutes
    };
  }

  return {
    redirect: {
      destination: "/teams",
      permanent: false,
    },
  };
};
