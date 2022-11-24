import React, { Dispatch, SetStateAction } from "react";
import MovieCard from "../MovieCard/MovieCard";

type Props = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
  movies: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string;
    genres: [];
  }[];
};

const MovieList = ({
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  movies,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center" role="status">
        <span>Loading...</span>
      </div>
    );
  }

  return (
    <>
      <p className="font-normal pt-6">
        <span className="font-semibold">{movies.length}</span> movies found
      </p>
      <ul className="flex justify-between flex-wrap pb-7">
        {movies.map((movie) => {
          const movieInfo = { ...movie };
          return (
            <MovieCard
              key={movieInfo.id}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              movieInfo={movieInfo}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
