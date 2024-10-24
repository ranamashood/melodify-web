import styled from "styled-components";
import { socket } from "../socket";

interface Props {
  currentSong: string;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  songs: string[];
}

const SongsList = ({ currentSong, setCurrentSong, songs }: Props) => {
  const changeSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentSong = e.currentTarget.value;
    setCurrentSong(currentSong);
    socket.emit("current-song", currentSong);
  };

  return (
    <Container>
      {songs.map((song, index) => (
        <Button
          key={index}
          onClick={changeSong}
          value={song}
          active={currentSong === song}
        >
          {song}
        </Button>
      ))}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  gap: 5px;
  max-width: 20%;
  padding: 0 10px;
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
