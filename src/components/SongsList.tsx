interface Props {
  setCurrentSong: React.Dispatch<React.SetStateAction<string>>;
  songs: string[];
}

const SongsList = ({ setCurrentSong, songs }: Props) => {
  const changeSong = (e: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentSong(e.currentTarget.value);
  };

  return (
    <div>
      {songs.map((song, index) => (
        <div key={index}>
          <button onClick={changeSong} value={song}>
            {song}
          </button>
        </div>
      ))}
    </div>
  );
};

export default SongsList;
