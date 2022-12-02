import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../common/Spinner";
import { MovieListProps } from "../../types";
import { useAppSelector } from "../../hooks";

const MovieList = ({
  setIsDeleteModalOpen,
  setIsEditModalOpen,
}: MovieListProps) => {
  const { isLoading, movies, error } = useAppSelector((state) => state.movies);

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <div
        className="h-full max-h-screen flex justify-center items-center"
        role="status"
      >
        <span>{error}</span>
      </div>
    );
  }

  return (
    <>
      <p className="font-normal pt-6">
        <span className="font-semibold">{movies.length}</span> movies found
      </p>
      {/* <ul className="flex flex-wrap justify-between pb-7">     */}
      <ul className="grid grid-cols-3">
        {movies?.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              setIsDeleteModalOpen={setIsDeleteModalOpen}
              setIsEditModalOpen={setIsEditModalOpen}
              // setIsMovieDetailsShow={setIsMovieDetailsShow}
              movieInfo={movie}
            />
          );
        })}
      </ul>
    </>
  );
};

export default MovieList;
