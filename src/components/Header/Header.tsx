import React from "react";
import { Outlet } from "react-router";
import { useParams } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

const Header = () => {
  const { movieId } = useParams();
  const isMovieDetailsShow = movieId?.includes("movie");

  const className = cx("header-section", "pt-5", "pb-7", {
    "header-section-bg": !isMovieDetailsShow,
  });
  return (
    <header className={className}>
      <div className="container mx-auto">
        <Outlet />
      </div>
    </header>
  );
};

export default Header;
