import React from "react";
import ErrBoundary from "../ErrorBoundary/ErrorBoundary";
import Filter from "../Filter/Filter";
import MovieList from "../MovieList/MovieList";
import { useAppSelector } from "../../hooks";

function Main() {
  const { isLoading, errors, movies } = useAppSelector((state) => state.movies);
  const className = (isLoading || errors || !movies.length) && "h-full";

  return (
    <main className={`main-section mt-2 ${className}`}>
      <div className={`container mx-auto ${className}`}>
        <ErrBoundary>
          <Filter />
          <MovieList />
        </ErrBoundary>
      </div>
    </main>
  );
}

export default Main;
