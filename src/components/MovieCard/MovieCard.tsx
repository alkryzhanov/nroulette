import React, { Dispatch, MouseEvent, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import styles from "./MovieCard.module.css";
import closeIcon from "../../assets/close-btn.svg";
import { useAppDispatch } from "../../hooks";
import { fetchMovieById } from "../../store/movie-details-slice";
import { PLACEHOLDER_IMG_LINK } from "../../constants";

type Props = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  // setIsMovieDetailsShow: Dispatch<SetStateAction<boolean>>;
  movieInfo: {
    id: number;
    title: string;
    release_date: string;
    poster_path: string | null;
    genres: [];
  };
};

const cx = classNames.bind(styles);

const MovieCard = ({
  setIsDeleteModalOpen,
  setIsEditModalOpen,
  movieInfo,
}: Props) => {
  const INITIAL_SRC =
    movieInfo.poster_path === null
      ? `${PLACEHOLDER_IMG_LINK}${movieInfo.title}`
      : movieInfo.poster_path;
  const dispatch = useAppDispatch();
  const [isShow, setIsSHow] = useState<boolean>(false);
  const [isCtxBtnShow, setIsCtxBtnShow] = useState<boolean>(false);
  const [src, setSrc] = useState(INITIAL_SRC);
  const toggleMenu = () => {
    setIsSHow((prevState) => !prevState);
  };

  const deleteMovieHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const editMovieHandler = () => {
    setIsEditModalOpen(true);
  };

  const ctxMenuBtnHandler = (evt: MouseEvent, isShown = false) => {
    const target = evt.target as HTMLButtonElement;
    if (target.tagName === "IMG") {
      setIsCtxBtnShow(isShown);
    }
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
        onClick={editMovieHandler}
      >
        Edit
      </a>
      <a
        href="/#"
        className={cx("context-menu-item")}
        onClick={deleteMovieHandler}
      >
        Delete
      </a>
    </div>
  );
  const cxtMenuBtn = (
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
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions
    <li
      className="font-medium pt-7 flex justify-center"
      id={movieInfo.id.toString()}
      onMouseEnter={(e) => ctxMenuBtnHandler(e, true)}
      onMouseLeave={(e) => ctxMenuBtnHandler(e, false)}
      onClick={onClickMovieHandler.bind(null, movieInfo.id)}
    >
      {isCtxBtnShow && cxtMenuBtn}
      {isShow && ctxMenu}
      <div className={cx("movie-list-item")}>
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
