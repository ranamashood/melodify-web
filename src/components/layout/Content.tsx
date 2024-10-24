import SocketsList from "../SocketsList";
import VolumeSlider from "../VolumeSlider";

interface Props {
  currentSong: string;
  audio: HTMLAudioElement;
  sockets: string[];
}

const Content = ({ currentSong, audio, sockets }: Props) => {
  return (
    <div>
      <div>{currentSong}</div>
      <VolumeSlider audio={audio} />
      <SocketsList sockets={sockets} />
    </div>
  );
};

export default Content;
