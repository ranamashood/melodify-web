import styled from "styled-components";
import { socket } from "../socket";
import Slider from "./Slider";

interface Props {
  duration: number;
  currentTime: number;
}

const SeekSlider = ({ duration, currentTime }: Props) => {
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSeek = parseInt(e.currentTarget.value);
    socket.emit("change-seek", newSeek);
  };

  const secToMin = (totalSeconds: number): string => {
    const minutes: number = Math.floor(totalSeconds / 60);
    const seconds: number = totalSeconds % 60;
    const secondsStr: string =
      seconds < 10 ? `0${seconds}` : seconds.toString();

    return `${minutes}:${secondsStr}`;
  };

  return (
    <Container>
      <div>{secToMin(currentTime)}</div>
      <Slider
        min={0}
        max={duration}
        value={currentTime}
        width={500}
        onChange={handleSeek}
      />
      <div>{secToMin(duration)}</div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  gap: 10px;
`;

export default SeekSlider;
