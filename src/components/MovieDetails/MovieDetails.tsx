import React, { Dispatch, SetStateAction } from "react";
import { ThreeDots } from "react-loader-spinner";
import Logo from "../Logo/Logo";
import searchIcon from "../../assets/search-btn.svg";
import { useAppSelector } from "../../hooks";

type MovieDetailsProps = {
  isMovieDetailsShow: boolean;
  setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
};

const MovieDetails = ({
  isMovieDetailsShow,
  setIsMovieDetailsShow,
}: MovieDetailsProps) => {
  const movie = useAppSelector((state) => state.movie.movieDetails);
  const isMovieDetailsLoading = useAppSelector(
    (state) => state.movie.isMovieDetailsLoading,
  );
  if (isMovieDetailsLoading) {
    return (
      <div className="h-96 h-full flex justify-center items-center">
        <div className="flex flex-col justify-center items-center">
          <ThreeDots
            height="80"
            width="80"
            radius="9"
            color="#f65261"
            ariaLabel="three-dots-loading"
            visible
          />
          <p>Loading...</p>
        </div>
      </div>
    );
  }
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
