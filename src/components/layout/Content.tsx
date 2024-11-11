import styled from "styled-components";
import SocketsList from "../SocketsList";
import Song from "../Song";
import { useState } from "react";
import SongControls from "../SongControls";

interface Props {
  currentSong: string;
  audio: HTMLAudioElement;
  sockets: string[];
}

const Content = ({ currentSong, audio, sockets }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  return (
    <Container>
      <Song filename={currentSong} setIsPlaying={setIsPlaying} />
      <SongControls
        audio={audio}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />
      <SocketsList sockets={sockets} />
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Content;
