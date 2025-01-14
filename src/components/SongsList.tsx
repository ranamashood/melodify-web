import styled from "styled-components";
import { socket } from "../socket";
import { SongInterface } from "../models";
import { SiApplemusic } from "react-icons/si";

interface Props {
  song: SongInterface;
  setSong: React.Dispatch<React.SetStateAction<SongInterface>>;
  filteredSongs: SongInterface[];
}

const SongsList = ({ song, setSong, filteredSongs }: Props) => {
  const changeSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    const currentSong = e.currentTarget.value;
    setSong(filteredSongs.find((song) => song.filename === currentSong)!);
    socket.emit("current-song", currentSong);
  };

  return (
    <Container>
      {filteredSongs.map((filteredSong, index) => (
        <Button
          key={index}
          onClick={changeSong}
          value={filteredSong.filename}
          active={filteredSong.filename === song.filename}
        >
          {filteredSong.thumbnail ? (
            <Img
              src={`${import.meta.env.VITE_API_URL}/uploads/images/${encodeURIComponent(filteredSong.thumbnail)}`}
            />
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
  padding-right: 10px;

  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #292733;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6d4aff;
    border-radius: 12px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background-color: #5c33ff;
  }

  &::-webkit-scrollbar-thumb:active {
    background-color: #8566ff;
  }

  @-moz-document url-prefix() {
    scrollbar-color: #6d4aff #292733;

    &:hover {
      scrollbar-color: #5c33ff #292733;
    }

    &:active {
      scrollbar-color: #8566ff #292733;
    }
  }
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
