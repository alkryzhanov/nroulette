import { Dispatch, SetStateAction } from "react";

export type HeaderProps = {
  onAddClick: Dispatch<SetStateAction<boolean>>;
  isMovieDetailsShow: boolean;
  setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
};
