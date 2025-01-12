import { SongInterface } from "../models";
import styled from "styled-components";
import { SiApplemusic } from "react-icons/si";

interface Props {
  song: SongInterface;
}

const Song = ({ song }: Props) => {
  return (
    <Container>
      {song.image ? (
        <Img
          src={`${import.meta.env.VITE_API_URL}/uploads/images/${song.image}`}
        />
      ) : (
        <SiApplemusic style={{ fontSize: "400px" }} />
      )}
      <Details>
        {song.artist} - {song.title}
      </Details>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  font-size: 1.5rem;
  background-color: #292733;
  padding: 30px;
  padding-bottom: 20px;
  border-radius: 15px;
`;

const Img = styled.img`
  border-radius: 12px;
  width: 400px;
`;

const Details = styled.div`
  text-align: center;
`;

export default Song;
