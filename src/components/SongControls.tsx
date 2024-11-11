import { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaPause, FaPlay } from "react-icons/fa";
import { socket } from "../socket";
import SeekSlider from "./SeekSlider";
import VolumeSlider from "./VolumeSlider";

interface Props {
  audio: HTMLAudioElement;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
}

const SongControls = ({ audio, isPlaying, setIsPlaying }: Props) => {
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
    isPlaying ? audio.play() : audio.pause();
  }, [isPlaying]);

  const playPause = () => {
    isPlaying ? socket.emit("pause") : socket.emit("play");
    console.log(audio.duration);
  };

  return (
    <Container>
      <UpperContainer>
        <Button
          onClick={playPause}
          Icon={isPlaying ? FaPause : FaPlay}
          circle
        />
      </UpperContainer>
      <LowerContainer>
        <SeekSlider duration={audio.duration} currentTime={currentTime} />
        <VolumeContainer>
          <VolumeSlider audio={audio} />
        </VolumeContainer>
      </LowerContainer>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: calc(50% - 5px);
  transform: translateX(-50%);
  width: 99%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  background-color: #292733;
  padding: 10px;
  border-radius: 15px 15px 0 0;
`;

const UpperContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const LowerContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const VolumeContainer = styled.div`
  position: absolute;
  right: 100px;
`;

export default SongControls;
