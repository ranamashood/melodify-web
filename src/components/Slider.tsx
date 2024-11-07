import styled from "styled-components";

interface Props {
  min: number;
  max: number;
  value: number;
  width?: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Slider = ({ min, max, value, width, onChange }: Props) => {
  return (
    <Input
      type="range"
      min={min}
      max={Math.floor(max)}
      value={value}
      width={width}
      onChange={onChange}
    />
  );
};

const Input = styled.input<{ width?: number }>`
  width: ${(props) => props.width}px;
  accent-color: #6d4aff;
`;

export default Slider;
