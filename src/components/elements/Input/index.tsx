import { Container } from "./styles";

interface InputProps {
  value: string;
  onChange: (newValue: string) => void;
}

export const Input: React.FC<InputProps> = ({ value, onChange }) => {
  return (
    <Container>
      <input
        value={value}
        type="text"
        placeholder="Filter..."
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
    </Container>
  );
};
