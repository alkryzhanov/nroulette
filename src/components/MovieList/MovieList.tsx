import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import { MovieListProps } from "../../types";
import { useAppSelector } from "../../hooks";

const MovieList = ({
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  setIsMovieDetailsShow,
}: MovieListProps) => {
  const isLoading = useAppSelector((state) => state.movies.isLoading);
  const movies = useAppSelector((state) => state.movies.movies);

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
        {movies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              setIsMovieDetailsShow={setIsMovieDetailsShow}
              movieInfo={movie}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
