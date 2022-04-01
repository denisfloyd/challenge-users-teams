import React from "react";
import Link from "next/link";
import styled from "styled-components";
import { IoMdBackspace } from "react-icons/io";

import Button from "@/components/elements/Button";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  button {
    width: auto;
    display: flex;
    align-items: center;

    svg {
      margin-right: 0.5rem;
    }
  }
`;

const Page_404: React.FC = () => {
  return (
    <Container>
      <h1>You seemed lost 😅</h1>
      <span>Click to back for main page</span>

      <Link href="/" passHref={true}>
        <Button>
          <IoMdBackspace />
          Back
        </Button>
      </Link>
    </Container>
  );
};

export default Page_404;
