import { Dispatch, SetStateAction } from "react";

export type MovieType = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: [];
};

export type MoviesType = MovieType[];

export type MovieListProps = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
  // setMovieId: Dispatch<SetStateAction<any>>;
};
