import styled from "styled-components";
import { shade } from "polished";

import { SIZE } from "@/styles/abstracts/_variables";
import { flexbox } from "@/styles/abstracts/_mixins";
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

export const TeamCard = styled.li`
  ${flexbox("column", "stretch")};
  background-color: var(--blue-300);
  color: var(--white);
  border-radius: 2px;
  cursor: pointer;
  padding: ${SIZE._16};
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: ${shade(0.2, "#4286d4")};
  }
`;

export const ErrorMessage = styled.h1`
  color: var(--red-500);
  text-align: center;
`;
