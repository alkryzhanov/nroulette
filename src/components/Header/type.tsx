import { Dispatch, SetStateAction } from "react";

type MovieType = null | {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: string[];
  runtime: number;
};
export type HeaderProps = {
  onAddClick: Dispatch<SetStateAction<boolean>>;
  isMovieDetailsShow: boolean;
  setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
  movie: MovieType;
};
