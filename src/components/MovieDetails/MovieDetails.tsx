import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Logo from "../Logo/Logo";
import Spinner from "../common/Spinner";
import searchIcon from "../../assets/search-btn.svg";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { PLACEHOLDER_IMG_LINK } from "../../constants";
import { fetchMovieById } from "../../store/movie-details-slice";

const MovieDetails = () => {
  const dispatch = useAppDispatch();
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { movieDetails, isMovieDetailsLoading } = useAppSelector(
    (state) => state.movie,
  );
  const [src, setSrc] = useState(movieDetails?.poster_path);
  const imgErrorHandler = () => {
    // eslint-disable-next-line no-param-reassign
    setSrc(`${PLACEHOLDER_IMG_LINK}${movieDetails?.title}`);
  };

  const closeHandler = () => {
    navigate("/search");
  };

  useEffect(() => {
    if (movieId !== undefined && movieId.includes("movie")) {
      const idx = +movieId.indexOf("=") + 1;
      const id = +movieId.slice(idx);

      dispatch(fetchMovieById(id));
    }
  }, [dispatch, movieId]);

  useEffect(() => {
    if (movieDetails?.poster_path === null) {
      setSrc(`${PLACEHOLDER_IMG_LINK}${movieDetails?.title}`);
    } else {
      // @ts-ignore
      setSrc(movieDetails?.poster_path);
    }
  }, [movieDetails?.poster_path, movieDetails?.title]);

  if (isMovieDetailsLoading) {
    return <Spinner />;
  }

  if (!movieDetails) {
    return <p>There is no movie info!</p>;
  }

  const movieHeader = (
    <>
      <Logo />
      <button type="button" name="search-btn" onClick={closeHandler}>
        <img src={searchIcon} alt="Search button" />
      </button>
    </>
  );

  const movieBody = (
    <>
      <img
        src={src}
        alt={movieDetails.title}
        className="max-w-xs"
        onError={imgErrorHandler}
      />
      <div className="flex flex-col pl-14">
        <div className="flex">
          <h5 className="font-light text-4xl tracking-wide uppercase mr-6">
            {movieDetails.title}
          </h5>
          <span className="w-16 h-16 rounded-full border-2 border-white flex justify-center items-center -mt-3">
            <span className="font-light text-xl leading-6 uppercase">
              {movieDetails.vote_average}
            </span>
          </span>
        </div>
        <p
          className="pt-3 font-medium text-sm leading-4 mix-blend-normal
           opacity-50"
        >
          {movieDetails.genres.join(", ")}
        </p>
        <div
          className="flex justify-between text-radical-red font-light text-2xl
             leading-7 w-56 pt-7"
        >
          <span>{new Date(movieDetails.release_date).getFullYear()}</span>
          <span>2h 34min</span>
        </div>
        <p
          className="font-light opacity-50 mix-blend-normal text-xl leading-6
           pt-7"
        >
          {movieDetails.overview}
        </p>
      </div>
    </>
  );

  return (
    <>
      <div className="flex justify-between items-center">{movieHeader}</div>
      <div className="flex justify-between pt-7">{movieBody}</div>
    </>
  );
};

export default MovieDetails;
