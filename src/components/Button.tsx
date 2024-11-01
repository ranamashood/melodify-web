import { IconType } from "react-icons";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  title?: string;
  Icon?: IconType;
  active?: boolean;
  circle?: boolean;
}

const Button = ({
  onClick,
  title,
  Icon,
  active = false,
  circle = false,
}: Props) => {
  return (
    <StyledButton onClick={onClick} active={active} circle={circle}>
      {Icon && <Icon />}
      {title && title}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ active: boolean; circle: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  outline: none;
  color: inherit;
  background-color: ${(props) => (props.active ? "#292733" : "#16141c")};
  border-radius: ${(props) => (props.circle ? "50%" : "10px")};
  padding: ${(props) => (props.circle ? "20px" : "10px")};
  font-size: ${(props) => props.circle && "1.2rem"};
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #24212b;
  }
`;

export default Button;
