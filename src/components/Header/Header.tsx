import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("header-wrapper")}>
      <div className="container mx-auto ">
        <div className="flex justify-between items-center">
          <h1 className={styles.logo}>
            netflix
            <span>roulette</span>
          </h1>
          <button type="button" className={cx("add-btn")} name="add-btn">
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
      </div>
    </div>
  );
}

export default Header;
