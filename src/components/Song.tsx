import { useEffect, useState } from "react";
import { SongInterface } from "../models";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";

interface Props {
  filename: string;
}

const Song = ({ filename }: Props) => {
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
    navigator.mediaSession.metadata = new MediaMetadata({
      artist: song.artist,
      title: song.title,
      artwork: [{ src: song.image }],
    });
  }, [song]);

  return (
    <Container>
      {song.image ? (
        <Img src={song.image} />
      ) : (
        <SiApplemusic style={{ fontSize: "21rem", width: "400px" }} />
      )}
      <Details>
        {song.artist} - {song.title}
      </Details>
    </Container>
  );
};

const Container = styled.div`
  max-width: 400px;
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
  width: 100%;
`;

const Details = styled.div`
  text-align: center;
`;

export default Song;
