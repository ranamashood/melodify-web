import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const Dropdown = ({ children }: Props) => {
  return <Container>{children}</Container>;
};

const Container = styled.div`
  position: relative;
`;

export default Dropdown;
