import { useState } from "react";
import Slider from "./Slider";

interface Props {
  audio: HTMLAudioElement;
}

const VolumeSlider = ({ audio }: Props) => {
  const [volume, setVolume] = useState<number>(audio.volume * 100);

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.currentTarget.value);
    setVolume(newVolume);
    audio.volume = newVolume / 100;
  };

  return <Slider min={0} max={100} value={volume} onChange={changeVolume} />;
};

export default VolumeSlider;
