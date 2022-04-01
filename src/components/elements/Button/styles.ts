import styled from "styled-components";
import { shade } from "polished";
import { FONT_WEIGHT, SIZE } from "@/styles/abstracts/_variables";

export const Container = styled.button`
  background: var(--blue-300);
  height: 3rem;
  border-radius: 5px;
  border: 0;
  padding: 0 ${SIZE._16};
  color: var(--white);
  width: 100%;
  font-weight: ${FONT_WEIGHT.MEDIUM};
  margin-top: ${SIZE._16};
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.2, "#4286d4")};
  }
`;
