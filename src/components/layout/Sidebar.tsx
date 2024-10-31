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
import DropdownMenu from "../DropdownMenu";
import Dropdown from "../Dropdown";

interface Props {
  currentSong: string;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  songs: SongInterface[];
}

const Sidebar = ({ currentSong, setCurrentSong, songs }: Props) => {
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
        <Dropdown>
          <Button
            onClick={() => setShowDropdown(!showDropdown)}
            Icon={FaSortAmountDown}
            active={true}
          />
          {showDropdown && <DropdownMenu menuItems={sortOptions} />}
        </Dropdown>
      </Filters>
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

const Filters = styled.div`
  display: flex;
  gap: 10px;
`;

export default Sidebar;
