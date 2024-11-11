import { useEffect, useState } from "react";
import { SongInterface } from "../models";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";

interface Props {
  filename: string;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const Song = ({ filename, setIsPlaying }: Props) => {
  const [song, setSong] = useState<SongInterface>({} as SongInterface);

  useEffect(() => {
    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/song-metadata/${filename}`,
      );
      const data = await response.json();
      setSong(data);
    })();
  }, [filename]);

  useEffect(() => {
    if (song.title) {
      setIsPlaying(true);

      document.title = `${song.artist} • ${song.title}`;

      navigator.mediaSession.metadata = new MediaMetadata({
        artist: song.artist,
        title: song.title,
        artwork: [
          { src: `${import.meta.env.VITE_API_URL}/images/${song.image}` },
        ],
      });

      // TODO: use setStateAction for handling pause and play actions
      console.log(navigator.mediaSession.playbackState);
    }
  }, [song]);

  return (
    <Container>
      {song.image ? (
        <Img src={`${import.meta.env.VITE_API_URL}/images/${song.image}`} />
      ) : (
        <SiApplemusic style={{ fontSize: "400px" }} />
      )}
      <Details>
        {song.artist} - {song.title}
      </Details>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 1.5rem;
  background-color: #292733;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 15px;
`;

const Img = styled.img`
  border-radius: 12px;
  width: 400px;
`;

const Details = styled.div`
  text-align: center;
`;

export default Song;
