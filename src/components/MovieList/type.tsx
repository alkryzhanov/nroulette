import { Dispatch, SetStateAction } from "react";

export type MovieListProps = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
  setMovieId: Dispatch<SetStateAction<any>>;
  isLoading: boolean;
  movies: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    genres: [];
  }[];
};
