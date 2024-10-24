import styled from "styled-components";

interface Props {
  songs: string[];
  setFilteredSongs: React.Dispatch<React.SetStateAction<string[]>>;
}

const SearchSongs = ({ songs, setFilteredSongs }: Props) => {
  const filterSongs = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.currentTarget.value.toLowerCase();
    setFilteredSongs(
      songs.filter((song) => song.toLowerCase().includes(query)),
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
`;

export default SearchSongs;
