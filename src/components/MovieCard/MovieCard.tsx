import React, { MouseEvent, useState } from "react";
import classNames from "classnames/bind";
import styles from "./MovieCard.module.css";
import closeIcon from "../../assets/close-btn.svg";
import { useAppDispatch } from "../../hooks";
import {
  fetchMovieById,
  fetchMovieToEdit,
  setMovieId,
} from "../../store/movie-details-slice";
import { MODALS, PLACEHOLDER_IMG_LINK } from "../../constants";
import { MovieType } from "../../types";
import { showModal } from "../../store/modal-slice";

type MovieCardType = {
  movieInfo: MovieType;
};

const cx = classNames.bind(styles);

const MovieCard = ({ movieInfo }: MovieCardType) => {
  const INITIAL_SRC =
    movieInfo.poster_path === null
      ? `${PLACEHOLDER_IMG_LINK}${movieInfo.title}`
      : movieInfo.poster_path;
  const dispatch = useAppDispatch();
  const [isShow, setIsShow] = useState<boolean>(false);
  const [isCtxBtnShow, setIsCtxBtnShow] = useState<boolean>(false);
  const [src, setSrc] = useState(INITIAL_SRC);
  const movieId = movieInfo.id.toString();
  const toggleMenu = (evt: MouseEvent) => {
    evt.stopPropagation();

    setIsShow((prevState) => !prevState);
  };

  const deleteMovieHandler = (evt: MouseEvent) => {
    evt.stopPropagation();

    setIsShow(false);
    setIsCtxBtnShow(false);

    dispatch(showModal(MODALS.DELETE_MODAL));
    dispatch(setMovieId(movieInfo.id.toString()));
  };

  const editMovieHandler = (evt: MouseEvent) => {
    evt.stopPropagation();

    setIsShow(false);
    setIsCtxBtnShow(false);

    dispatch(showModal(MODALS.EDIT_MODAL));
    dispatch(fetchMovieToEdit(movieInfo.id));
  };

  const onMouseEnterHandler = () => {
    setIsCtxBtnShow(true);
  };

  const onMouseLeaveHandler = () => {
    setIsCtxBtnShow(false);
  };

  const onClickMovieHandler = (id: number) => {
    dispatch(fetchMovieById(id));
  };

  const onImgErrorHandler = () => {
    // eslint-disable-next-line no-param-reassign
    setSrc(`${PLACEHOLDER_IMG_LINK}${movieInfo.title}`);
  };

  const ctxMenu = (
    <div className={cx("context-menu")}>
      <button
        type="button"
        className={cx("context-menu-close-btn")}
        onClick={toggleMenu}
      >
        <img
          src={closeIcon}
          alt="Close button"
          className={cx("context-menu-close-btn-icon")}
        />
      </button>
      <a
        href="/#"
        className={cx("context-menu-item")}
        onClick={(evt) => editMovieHandler(evt)}
      >
        Edit
      </a>
      <a
        href="/#"
        className={cx("context-menu-item")}
        onClick={(evt) => deleteMovieHandler(evt)}
      >
        Delete
      </a>
    </div>
  );
  const ctxMenuBtn = (
    <button
      type="button"
      className={cx("context-menu-btn")}
      onClick={toggleMenu}
    >
      <div className="flex flex-col justify-between items-center w-full h-5">
        <span className={cx("context-menu-dot")} />
        <span className={cx("context-menu-dot")} />
        <span className={cx("context-menu-dot")} />
      </div>
    </button>
  );
  return (
    <li className="font-medium pt-7 flex justify-center" id={movieId}>
      {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/mouse-events-have-key-events,jsx-a11y/no-static-element-interactions */}
      <div
        className={cx("movie-list-item")}
        onMouseOver={onMouseEnterHandler}
        onMouseLeave={onMouseLeaveHandler}
        onClick={onClickMovieHandler.bind(null, movieInfo.id)}
      >
        {isCtxBtnShow && ctxMenuBtn}
        {isShow && ctxMenu}
        <img
          src={src}
          alt={movieInfo.title}
          className="max-w-xs"
          onError={onImgErrorHandler}
        />
        <div className="flex justify-between items-center opacity-70 mix-blend-normal pt-5">
          <span className="text-lg">{movieInfo.title}</span>
          <span className="text-sm px-2 py-1 border-solid border border-slate-500 rounded">
            {new Date(movieInfo.release_date).getFullYear()}
          </span>
        </div>
        <span className="text-sm pt-2 opacity-30 mix-blend-normal">
          {movieInfo.genres.slice(0, 2).join(", ")}
        </span>
      </div>
    </li>
  );
};

export default MovieCard;
