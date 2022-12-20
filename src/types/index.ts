export type MovieType = {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  genres: [];
};

export type MoviesType = MovieType[];

export type MovieDetailsType = {
  title: string;
  vote_average: number;
  release_date: string | Date;
  poster_path: string;
  overview: string;
  genres: string[];
  runtime: number;
  id?: number;
};

export type MovieState = {
  movieStatus: string;
  movieDetails: MovieDetailsType | null;
  isMovieDetailsLoading: boolean;
  isMovieDetailsShow: boolean;
  movieErrors: null | {};
  movieId: string;
};

export type MoviesState = {
  status: string;
  movies: MoviesType;
  isLoading: boolean;
  errors: null | { [key: string]: string };
};

export type FormikInitialValuesType = {
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: string;
  genres: string;
  runtime: string;
  overview: string;
};

export type ErrorDataType = {
  [key: string]: string;
};

export type ModalSliceInitialType = {
  modalType: string;
  isModalShown: boolean;
};
