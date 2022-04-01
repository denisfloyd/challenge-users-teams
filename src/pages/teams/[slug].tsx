import { useEffect, useState } from "react";
import { GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { IoMdBackspace } from "react-icons/io";

import { getTeam, Team } from "@/services/hooks/useTeams";
import { api } from "@/services/apiClient";

import { useSearch } from "@/hooks/useSearch";

import Button from "@/components/elements/Button";
import { Header } from "@/components/widgets/Header";
import { Loading } from "@/components/widgets/LoadingState";
import { Input } from "@/components/elements/Input";

import Container, { ListContainer, UserCard } from "./styles";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  displayName: string;
  location: string;
  isLeader?: boolean;
}

interface TeamMembersProps {
  team: Team;
  members: User[];
}

export default function TeamMembers({
  team,
  members: memberFromServer,
}: TeamMembersProps) {
  const router = useRouter();

  const [members, setMembers] = useState<User[]>(memberFromServer);

  const filterUsers = (filterText: string) => {
    return memberFromServer.filter((member) => {
      return JSON.stringify(member)
        .toLowerCase()
        .includes(filterText.toLowerCase());
    });
  };

  const {
    inputSearch,
    setInputSearch,
    loading: loadingSearching,
    result: resultSearching,
  } = useSearch(filterUsers);

  useEffect(() => {
    if (resultSearching) {
      if (inputSearch) {
        setMembers(resultSearching);
      } else {
        setMembers(memberFromServer);
      }
    }
  }, [resultSearching, memberFromServer]);

  function handleClickBack() {
    router.replace("/");
  }

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Container>
      <Button onClick={handleClickBack} data-testid="button-back">
        <IoMdBackspace />
        Back
      </Button>

      <Header title={`Team ${team.name}`} />

      <Input value={inputSearch} onChange={setInputSearch} />

      {loadingSearching && <span>Loading ...</span>}

      <ListContainer>
        {members.map((member) => (
          <UserCard key={member.id} isLeader={member.isLeader}>
            <h3>{member.displayName}</h3>
            <span>
              {member.firstName} {member.lastName}
            </span>
            <p>Location: {member.location}</p>
          </UserCard>
        ))}
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

    const members: User[] = [];

    await Promise.all(
      team.teamMemberIds.map(async (memberId) => {
        return await api
          .get(`/users/${memberId}`)
          .then((res) => members.push(res.data));
      })
    );

    return {
      props: {
        team,
        members: [{ ...teamLeaderResponse.data, isLeader: true }, ...members],
      },
      revalidate: 60 * 30, // 30 minutes
    };
  }

  return {
    redirect: {
      destination: "/",
      permanent: false,
    },
  };
};
