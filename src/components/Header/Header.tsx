import React from "react";
import classNames from "classnames/bind";
import Logo from "../Logo/Logo";
import MovieDetails from "../MovieDetails/MovieDetails";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { showModal } from "../../store/modal-slice";
import { MODALS } from "../../constants";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

const Header = () => {
  const dispatch = useAppDispatch();
  const { isMovieDetailsShow } = useAppSelector((state) => state.movie);
  const onClickHandler = () => {
    dispatch(showModal(MODALS.ADD_MOVIE_MODAL));
  };

  let headerView = (
    <>
      <div className="flex justify-between items-center">
        <Logo />
        <button
          type="button"
          className={cx("add-btn", "bg-gray-one")}
          name="add-btn"
          onClick={onClickHandler}
        >
          + add movie
        </button>
      </div>
      <div className="flex justify-center pt-9">
        <div className="w-full max-w-6xl">
          <h3 className={cx("search-title")}>FIND YOUR MOViE</h3>
          <div className="flex justify-between pt-10">
            <input
              type="text"
              name="search-input"
              className={cx("search-input")}
              placeholder="What do you want to watch?"
            />
            <button
              type="button"
              className={cx("search-btn", "bg-radical-red")}
              name="search-btn"
            >
              search
            </button>
          </div>
        </div>
      </div>
    </>
  );

  if (isMovieDetailsShow) {
    headerView = <MovieDetails />;
  }
  return (
    <header
      className={cx("header-section", "pt-5", "pb-7", {
        "header-section-bg": !isMovieDetailsShow,
      })}
    >
      <div className="container mx-auto">{headerView}</div>
    </header>
  );
};

export default Header;
