import { useEffect, useState } from "react";
import SongsList from "../SongsList";
import SearchSongs from "../SearchSongs";
import styled from "styled-components";
import Button from "../Button";
import { DropdownInterface, SongInterface } from "../../models";
import {
  FaSortAlphaDown,
  FaSortAlphaDownAlt,
  FaSortAmountDown,
  FaSortNumericDown,
  FaSortNumericDownAlt,
} from "react-icons/fa";
import Dropdown from "../Dropdown";

interface Props {
  song: SongInterface;
  setSong: React.Dispatch<React.SetStateAction<SongInterface>>;
  songs: SongInterface[];
}

const Sidebar = ({ song, setSong, songs }: Props) => {
  const [filteredSongs, setFilteredSongs] = useState<SongInterface[]>(songs);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  useEffect(() => {
    setFilteredSongs(songs);
  }, [songs]);

  const sortOptions: DropdownInterface[] = [
    {
      title: "Recently uploaded",
      Icon: FaSortNumericDownAlt,
      onClick: () => {
        setFilteredSongs(
          filteredSongs.sort((a, b) => b.uploadedTime - a.uploadedTime),
        );
        setShowDropdown(false);
      },
    },
    {
      title: "Oldest uploaded",
      Icon: FaSortNumericDown,
      onClick: () => {
        setFilteredSongs(
          filteredSongs.sort((a, b) => a.uploadedTime - b.uploadedTime),
        );
        setShowDropdown(false);
      },
    },
    {
      title: "Alphabetically A-Z",
      Icon: FaSortAlphaDown,
      onClick: () => {
        setFilteredSongs(
          filteredSongs.sort((a, b) => a.filename.localeCompare(b.filename)),
        );
        setShowDropdown(false);
      },
    },
    {
      title: "Alphabetically Z-A",
      Icon: FaSortAlphaDownAlt,
      onClick: () => {
        setFilteredSongs(
          filteredSongs.sort((a, b) => b.filename.localeCompare(a.filename)),
        );
        setShowDropdown(false);
      },
    },
  ];

  return (
    <Container>
      <Filters>
        <SearchSongs songs={songs} setFilteredSongs={setFilteredSongs} />
        <Dropdown menuItems={sortOptions} showDropdown={showDropdown}>
          <Button
            onClick={() => setShowDropdown(!showDropdown)}
            Icon={FaSortAmountDown}
            active={true}
          />
        </Dropdown>
      </Filters>
      <SongsList song={song} setSong={setSong} filteredSongs={filteredSongs} />
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

const Filters = styled.div`
  display: flex;
  gap: 10px;
`;

export default Sidebar;
