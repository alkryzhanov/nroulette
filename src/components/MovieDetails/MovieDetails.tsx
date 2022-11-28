import React, { Dispatch, SetStateAction } from "react";
import Logo from "../Logo/Logo";
import searchIcon from "../../assets/search-btn.svg";
import poster from "../../assets/image-1.jpg";

type MovieDetailsProps = {
  isMovieDetailsShow: boolean;
  movie: null | {
    title: string;
    vote_average: number;
    release_date: string;
    poster_path: string;
    overview: string;
    genres: string[];
    runtime: number;
  };
  setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
};

const MovieDetails = ({
  isMovieDetailsShow,
  movie,
  setIsMovieDetailsShow,
}: MovieDetailsProps) => {
  if (!movie) {
    return <p>There is no movie info!</p>;
  }
  return (
    <>
      <div className="flex justify-between items-center">
        <Logo isMovieDetailsShow={isMovieDetailsShow} />
        <button
          type="button"
          name="search-btn"
          onClick={() => setIsMovieDetailsShow(false)}
        >
          <img src={searchIcon} alt="Search button" />
        </button>
      </div>
      <div className="flex justify-between pt-7">
        <img src={movie.poster_path} alt="Movie poster" className="max-w-xs" />
        <div className="flex flex-col pl-14">
          <div className="flex">
            <h5 className="font-light text-4xl tracking-wide uppercase mr-6">
              {movie.title}
            </h5>
            <span className="w-16 h-16 rounded-full border-2 border-white flex justify-center items-center -mt-3">
              <span className="font-light text-xl leading-6 uppercase">
                {movie.vote_average}
              </span>
            </span>
          </div>
          <p
            className="pt-3 font-medium text-sm leading-4 mix-blend-normal
           opacity-50"
          >
            {movie.genres.join(", ")}
          </p>
          <div
            className="flex justify-between text-radical-red font-light text-2xl
             leading-7 w-56 pt-7"
          >
            <span>{new Date(movie.release_date).getFullYear()}</span>
            <span>2h 34min</span>
          </div>
          <p
            className="font-light opacity-50 mix-blend-normal text-xl leading-6
           pt-7"
          >
            {movie.overview}
          </p>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
