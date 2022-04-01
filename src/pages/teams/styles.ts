import styled, { css } from "styled-components";

import { SIZE } from "@/styles/abstracts/_variables";
import { convertPixelToREM } from "@/styles/abstracts/_functions";

export const Container = styled.main`
  padding: ${SIZE._32};
  height: 100vh;
  position: relative;
  overflow: overlay;
`;

export const ListContainer = styled.ul`
  display: grid;
  grid-gap: ${SIZE._24};
  grid-template-columns: repeat(auto-fit, max(${convertPixelToREM(250)}));

  margin-top: ${SIZE._24};

  list-style: none;
`;

interface UserCardProps {
  isLeader?: boolean;
}

export const UserCard = styled.li<UserCardProps>`
  ${(props) =>
    props.isLeader &&
    css`
      color: var(--orange-100);
    `};
`;
