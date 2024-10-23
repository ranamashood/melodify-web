import { useEffect, useState } from "react";

import SongsList from "./components/SongsList";
import { socket } from "./socket";

function App() {
  const [audio, setAudio] = useState<HTMLAudioElement>();
  const [currentSong, setCurrentSong] = useState<string>("");
  const [songs, setSongs] = useState<string[]>([]);

  useEffect(() => {
    socket.on("new-song", (newSong: string) => setCurrentSong(newSong));

    (async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/get-all-songs`,
      );
      const data = await response.json();
      setSongs(data.songs);
    })();
  }, []);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/songs/${currentSong}`;

    if (!audio) {
      setAudio(new Audio(url));
      return;
    }

    audio.src = url;
    audio.play();
  }, [currentSong]);

  return (
    <>
      <SongsList setCurrentSong={setCurrentSong} songs={songs} />
    </>
  );
}

export default App;
