import React from "react";
import classNames from "classnames/bind";
import Logo from "../Logo/Logo";
import MovieDetails from "../MovieDetails/MovieDetails";
import { HeaderProps } from "./type";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

const Header = ({
  onAddClick,
  isMovieDetailsShow,
  setIsMovieDetailsShow,
  movie,
}: HeaderProps) => {
  const onAddClickHandler = () => {
    onAddClick(true);
  };
  return (
    <header
      className={cx("header-section", "pt-5", "pb-7", {
        "header-section-bg": !isMovieDetailsShow,
      })}
    >
      <div className="container mx-auto">
        {isMovieDetailsShow ? (
          <MovieDetails
            isMovieDetailsShow={isMovieDetailsShow}
            movie={movie}
            setIsMovieDetailsShow={setIsMovieDetailsShow}
          />
        ) : (
          <>
            <div className="flex justify-between items-center">
              <Logo />
              <button
                type="button"
                className={cx("add-btn")}
                name="add-btn"
                onClick={onAddClickHandler}
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
                    className={cx("search-btn")}
                    name="search-btn"
                  >
                    search
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
