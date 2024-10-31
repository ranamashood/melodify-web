import styled from "styled-components";
import { SongInterface } from "../models";

interface Props {
  songs: SongInterface[];
  setFilteredSongs: React.Dispatch<React.SetStateAction<SongInterface[]>>;
}

const SearchSongs = ({ songs, setFilteredSongs }: Props) => {
  const filterSongs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value.toLowerCase();
    setFilteredSongs(
      songs.filter((song) => song.filename.toLowerCase().includes(query)),
    );
  };

  return (
    <Input type="text" placeholder="Search songs" onChange={filterSongs} />
  );
};

const Input = styled.input`
  border: none;
  outline: none;
  border-radius: 10px;
  background-color: #292733;
  color: inherit;
  padding: 10px;
  cursor: pointer;
  text-align: left;
  flex: 1;
`;

export default SearchSongs;
