import { Container, StyledSpinner } from "./styles";

export const Loading: React.FC = () => {
  return (
    <Container>
      <StyledSpinner>
        <circle
          className="path"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="4"
        />
      </StyledSpinner>
    </Container>
  );
};
