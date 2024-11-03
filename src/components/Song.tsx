import { useEffect, useState } from "react";
import { SongInterface } from "../models";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";
import Button from "./Button";
import { FaPause, FaPlay } from "react-icons/fa";
import { socket } from "../socket";

interface Props {
  filename: string;
  audio: HTMLAudioElement;
}

const Song = ({ filename, audio }: Props) => {
  const [song, setSong] = useState<SongInterface>({} as SongInterface);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  useEffect(() => {
    socket.on("pause", () => setIsPlaying(false));
    socket.on("play", () => setIsPlaying(true));
  }, []);

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
        artwork: [{ src: song.image }],
      });

      // TODO: use setStateAction for handling pause and play actions
      console.log(navigator.mediaSession.playbackState);
    }
  }, [song]);

  useEffect(() => {
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  const playPause = () => {
    isPlaying ? socket.emit("pause") : socket.emit("play");
  };

  return (
    <Container>
      {song.image ? (
        <Img src={`${import.meta.env.VITE_API_URL}/images/${song.image}`} />
      ) : (
        <SiApplemusic style={{ fontSize: "21rem", width: "400px" }} />
      )}
      <Details>
        {song.artist} - {song.title}
      </Details>
      <div>
        <Button
          onClick={playPause}
          Icon={isPlaying ? FaPause : FaPlay}
          circle
        />
      </div>
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
