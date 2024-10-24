import SongsList from "../SongsList";

interface Props {
  currentSong: string;
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  songs: string[];
}

const Sidebar = ({ currentSong, setCurrentSong, songs }: Props) => {
  return (
    <SongsList
      currentSong={currentSong}
      setCurrentSong={setCurrentSong}
      songs={songs}
    />
  );
};

export default Sidebar;
