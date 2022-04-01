import { Text } from "./styles";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = ({ title }) => {
  return <Text>{title}</Text>;
};
