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

  return (
    <Slider
      min={0}
      max={duration}
      value={currentTime}
      width={500}
      onChange={handleSeek}
    />
  );
};

export default SeekSlider;
