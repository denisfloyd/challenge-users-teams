import { convertPixelToREM } from "@/styles/abstracts/_functions";
import styled from "styled-components";

export const Container = styled.div`
  position: relative;
  width: fit-content;

  > input {
    min-width: ${convertPixelToREM(260)};
    height: 40px;
    border: 1px solid var(--gray-300);
    color: var(--black);
    outline: 0;
    padding: 0 14px;
  }

  &:focus-within::after {
    width: calc(100%);
    height: 2px;
    content: "";
    background: var(--orange-100);
    position: absolute;
    left: 0;
    bottom: 0;
  }
`;
