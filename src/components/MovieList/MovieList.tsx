import React, { Dispatch, SetStateAction } from "react";
import MovieCard from "../MovieCard/MovieCard";

type Props = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  movies: {}[];

  isLoading: boolean;
};

const MovieList = ({
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  movies,
  isLoading,
}: Props) => {
  // const movies = data.data;
  // const resCount = movies.length || 0;

  if (isLoading) {
    return (
      <div className="spinner" role="status">
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
          return (
            <MovieCard
              key={movie.id}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              movieInfo={...movie}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
