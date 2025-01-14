import styled from "styled-components";
import SocketsList from "../SocketsList";
import Song from "../Song";
import { useEffect, useState } from "react";
import SongControls from "../SongControls";
import { SongInterface } from "../../models";

interface Props {
  song: SongInterface;
  audio: HTMLAudioElement;
  sockets: string[];
}

const Content = ({ song, audio, sockets }: Props) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    if (song.title) {
      setIsPlaying(true);

      document.title = `${song.artist} • ${song.title}`;

      navigator.mediaSession.metadata = new MediaMetadata({
        artist: song.artist,
        title: song.title,
        artwork: [
          {
            src: `${import.meta.env.VITE_API_URL}/uploads/images/${encodeURIComponent(song.image)}`,
          },
        ],
      });

      // TODO: use setStateAction for handling pause and play actions
      console.log(navigator.mediaSession.playbackState);
    }
  }, [song]);

  return (
    <Container>
      <Song song={song} />
      <SongControls
        audio={audio}
        duration={song.duration ? Math.floor(song.duration) : 0}
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
