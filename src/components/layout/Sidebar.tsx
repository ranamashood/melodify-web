import { useEffect, useState } from "react";
import SongsList from "../SongsList";
import SearchSongs from "../SearchSongs";
import styled from "styled-components";

interface Props {
  currentSong: string;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  songs: string[];
}

const Sidebar = ({ currentSong, setCurrentSong, songs }: Props) => {
  const [filteredSongs, setFilteredSongs] = useState<string[]>(songs);

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  return (
    <Container>
      <SearchSongs songs={songs} setFilteredSongs={setFilteredSongs} />
      <SongsList
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        filteredSongs={filteredSongs}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 20%;
  padding: 20px 10px;
`;

export default Sidebar;
