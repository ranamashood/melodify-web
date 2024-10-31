import { IconType } from "react-icons";
import styled from "styled-components";

interface Props {
  onClick: () => void;
  title?: string;
  Icon?: IconType;
  active?: boolean;
}

const Button = ({ onClick, title, Icon, active = false }: Props) => {
  return (
    <StyledButton onClick={onClick} active={active}>
      {Icon && (
        <IconContainer>
          <Icon />
        </IconContainer>
      )}
      {title && title}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 7px;
  border: none;
  outline: none;
  color: inherit;
  background-color: ${(props) => (props.active ? "#292733" : "#16141c")};
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #24212b;
  }
`;

const IconContainer = styled.div`
  font-size: 1.1rem;
`;

export default Button;
