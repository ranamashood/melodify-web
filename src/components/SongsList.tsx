import styled from "styled-components";
import { socket } from "../socket";

interface Props {
  currentSong: string;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  filteredSongs: string[];
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
          value={filteredSong}
          active={currentSong === filteredSong}
        >
          {filteredSong}
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

export default SongsList;
