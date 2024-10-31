import styled from "styled-components";
import { DropdownInterface } from "../models";
import Button from "./Button";

interface Props {
  menuItems: DropdownInterface[];
}

const DropdownMenu = ({ menuItems }: Props) => {
  return (
    <Container>
      {menuItems.map((menuItem) => (
        <Button
          title={menuItem.title}
          Icon={menuItem.Icon}
          onClick={menuItem.onClick}
        />
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 200px;
  position: absolute;
  left: 0;
  bottom: 0;
  transform: translateY(105%);
  background-color: #16141c;
  padding: 10px;
  border: 2px solid #6d4aff;
  border-radius: 12px;
`;

export default DropdownMenu;
