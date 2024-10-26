import styled from "styled-components";
import SocketsList from "../SocketsList";
import Song from "../Song";
import VolumeSlider from "../VolumeSlider";

interface Props {
  currentSong: string;
  audio: HTMLAudioElement;
  sockets: string[];
}

const Content = ({ currentSong, audio, sockets }: Props) => {
  return (
    <Container>
      <Song filename={currentSong} />
      <VolumeSlider audio={audio} />
      <SocketsList sockets={sockets} />
    </Container>
  );
};

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Content;
