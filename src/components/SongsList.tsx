import styled from "styled-components";
import { socket } from "../socket";
import { SongInterface } from "../models";
import { SiApplemusic } from "react-icons/si";

interface Props {
  currentSong: string;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  filteredSongs: SongInterface[];
}

const SongsList = ({ currentSong, setCurrentSong, filteredSongs }: Props) => {
  const changeSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentSong = e.currentTarget.value;
    setCurrentSong(currentSong);
    socket.emit("current-song", currentSong);
  };

  return (
    <Container>
      {filteredSongs.map((filteredSong, index) => (
        <Button
          key={index}
          onClick={changeSong}
          value={filteredSong.filename}
          active={currentSong === filteredSong.filename}
        >
          {filteredSong.image ? (
            <Img src={filteredSong.image} />
          ) : (
            <SiApplemusic style={{ fontSize: "1.7rem" }} />
          )}
          {filteredSong.filename}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  gap: 5px;
`;

const Button = styled.button<{ active: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  border: none;
  outline: none;
  color: inherit;
  background-color: ${(props) => (props.active ? "#24212B" : "#16141c")};
  border-radius: 10px;
  padding: 10px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background-color: #24212b;
  }
`;

const Img = styled.img`
  border-radius: 10px;
  width: 30px;
  height: 30px;
  object-fit: cover;
  object-position: center;
`;

export default SongsList;
