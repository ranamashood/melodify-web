import { useEffect, useState } from "react";
import { SongInterface } from "../models";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";
import Button from "./Button";
import { FaPause, FaPlay } from "react-icons/fa";
import { socket } from "../socket";
import SeekSlider from "./SeekSlider";

interface Props {
  filename: string;
  audio: HTMLAudioElement;
}

const Song = ({ filename, audio }: Props) => {
  const [song, setSong] = useState<SongInterface>({} as SongInterface);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

  useEffect(() => {
    socket.on("pause", () => setIsPlaying(false));
    socket.on("play", () => setIsPlaying(true));

    socket.on("new-seek", (newSeek: number) => (audio.currentTime = newSeek));

    audio.addEventListener("timeupdate", () =>
      setCurrentTime(audio.currentTime),
    );
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
        artwork: [
          { src: `${import.meta.env.VITE_API_URL}/images/${song.image}` },
        ],
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
        <SiApplemusic style={{ fontSize: "300px" }} />
      )}
      <MainContent>
        <Details>
          {song.artist} - {song.title}
        </Details>
        <Controls>
          <Button
            onClick={playPause}
            Icon={isPlaying ? FaPause : FaPlay}
            circle
          />
          <SeekSlider duration={song.duration} currentTime={currentTime} />
        </Controls>
      </MainContent>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  font-size: 2rem;
  background-color: #292733;
  padding: 10px;
  border-radius: 15px;
`;

const Img = styled.img`
  border-radius: 12px;
  width: 300px;
`;

const MainContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const Controls = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
`;

export default Song;
