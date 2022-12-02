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
  // setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
  // setMovieId: Dispatch<SetStateAction<any>>;
};

export type HeaderProps = {
  onAddClick: Dispatch<SetStateAction<boolean>>;
  // isMovieDetailsShow: boolean;
  // setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
};

export type MovieDetailsType = {
  title: string;
  vote_average: number;
  release_date: string;
  poster_path: string;
  overview: string;
  genres: string[];
  runtime: number;
};

export type MovieState = {
  movieDetails: MovieDetailsType | null;
  isMovieDetailsLoading: boolean;
  isMovieDetailsShow: boolean;
};
