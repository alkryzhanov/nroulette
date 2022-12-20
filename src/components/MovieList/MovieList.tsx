import React from "react";
import MovieCard from "../MovieCard/MovieCard";
import Spinner from "../common/Spinner";
import { useAppSelector } from "../../hooks";
import { StatusValues } from "../../constants";

const MovieList = () => {
  const { status, movies, errors } = useAppSelector((state) => state.movies);

  if (status === StatusValues.LOADING) {
    return <Spinner />;
  }

  if (status === StatusValues.FAILED && errors?.message) {
    return (
      <div
        className="h-full max-h-screen flex justify-center items-center"
        role="status"
      >
        <span>{errors?.message}</span>
      </div>
    );
  }

  return (
    <>
      <p className="font-normal pt-6">
        <span className="font-semibold">{movies.length}</span> movies found
      </p>
      <ul className="grid grid-cols-3">
        {movies?.map((movie) => {
          return <MovieCard key={movie.id} movieInfo={movie} />;
        })}
      </ul>
    </>
  );
};

export default MovieList;
