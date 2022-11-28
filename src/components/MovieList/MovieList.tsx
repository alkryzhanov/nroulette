import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { MovieListProps } from "./type";

const MovieList = ({
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setIsMovieDetailsShow,
  setMovieId,
  movies,
  isLoading,
}: MovieListProps) => {
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
      <ul className="flex flex-wrap justify-between pb-7">
        {movies.map((movie) => {
          const movieInfo = { ...movie };
          return (
            <MovieCard
              key={movieInfo.id}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setIsMovieDetailsShow={setIsMovieDetailsShow}
              setMovieId={setMovieId}
              movieInfo={movieInfo}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
