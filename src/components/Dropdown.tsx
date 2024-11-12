import styled from "styled-components";
import { DropdownInterface } from "../models";
import Button from "./Button";

interface Props {
  children: React.ReactNode;
  menuItems: DropdownInterface[];
  showDropdown: boolean;
}

const Dropdown = ({ children, menuItems, showDropdown }: Props) => {
  return (
    <Container>
      {children}
      {showDropdown && (
        <Menu>
          {menuItems.map((menuItem, index) => (
            <Button
              key={index}
              title={menuItem.title}
              Icon={menuItem.Icon}
              onClick={menuItem.onClick}
            />
          ))}
        </Menu>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const Menu = styled.div`
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
  z-index: 1;
`;

export default Dropdown;
