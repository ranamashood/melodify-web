import { IconType } from "react-icons";

export interface SongInterface {
  filename: string;
  title: string;
  artist: string;
  image: string;
  uploadedTime: number;
}

export interface DropdownInterface {
  title: string;
  Icon: IconType;
  onClick: () => void;
}
