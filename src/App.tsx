import { useEffect, useState } from "react";

import "./App.css";
import { socket } from "./socket";
import Sidebar from "./components/layout/Sidebar";
import styled from "styled-components";
import Content from "./components/layout/Content";
import { SongInterface } from "./models";

function App() {
  const [audio, setAudio] = useState<HTMLAudioElement>(new Audio());
  // TODO: switch currentSong from string to Song
  const [song, setSong] = useState<SongInterface>({} as SongInterface);
  const [songs, setSongs] = useState<SongInterface[]>([]);
  const [sockets, setSockets] = useState<string[]>([]);

  useEffect(() => {
    socket.on("sockets", (sockets: string[]) => setSockets(sockets));

    (async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/songs`);
      const data = await response.json();
      setSongs(data);
    })();
  }, []);

  useEffect(() => {
    socket.on("new-song", (newSong: string) =>
      setSong(songs.find((song) => song.filename === newSong)!),
    );
  }, [songs]);

  useEffect(() => {
    const url = `${import.meta.env.VITE_API_URL}/uploads/songs/${encodeURIComponent(song.filename)}`;

    if (!audio) {
      setAudio(new Audio(url));
      return;
    }

    audio.src = url;
    audio.play();
  }, [song]);

  return (
    <Container>
      <Sidebar song={song} setSong={setSong} songs={songs} />
      <Content song={song} audio={audio} sockets={sockets} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  background-color: #16141c;
  color: white;
  min-height: 100vh;
  max-height: 100vh;
`;

export default App;
