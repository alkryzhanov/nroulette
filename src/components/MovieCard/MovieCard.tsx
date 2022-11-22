import React, { Dispatch, SetStateAction, useState } from "react";
import classNames from "classnames/bind";
import styles from "./MovieCard.module.css";
import poster from "../../assets/image-1.jpg";
import closeIcon from "../../assets/close-btn.svg";

type Props = {
  setIsDeleteModalOpen: Dispatch<SetStateAction<boolean>>;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
};

const cx = classNames.bind(styles);

const MovieCard = ({ setIsDeleteModalOpen, setIsEditModalOpen }: Props) => {
  const [isShow, setIsSHow] = useState<boolean>(false);
  const toggleMenu = () => {
    setIsSHow((prevState) => !prevState);
  };

  const deleteMovieHandler = () => {
    setIsDeleteModalOpen(true);
  };

  const editMovieHandler = () => {
    setIsEditModalOpen(true);
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
  return (
    <li className={cx("movie-list-item", "font-medium", "pt-7")}>
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
      {isShow && ctxMenu}
      <img src={poster} alt="Movie poster" />
      <div className="flex justify-between items-center opacity-70 mix-blend-normal pt-5">
        <span className="text-lg">Pulp Fiction</span>
        <span className="text-sm px-2 py-1 border-solid border border-slate-500 rounded">
          2004
        </span>
      </div>
      <span className="text-sm pt-2 opacity-30 mix-blend-normal">
        Action & Adventure
      </span>
    </li>
  );
};

export default MovieCard;
