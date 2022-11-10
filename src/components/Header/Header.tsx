import React from "react";
import classNames from "classnames/bind";
import styles from "./Header.module.css";

const cx = classNames.bind(styles);

function Header() {
  return (
    <div className={cx("header-wrapper")}>
      <div className="container">
        <div className="row justify-content-between align-items-center">
          <div className="col-auto">
            <h1 className={styles.logo}>
              netflix
              <span>roulette</span>
            </h1>
          </div>
          <div className="col-auto">
            <button type="button" className={cx("add-btn")} name="add-btn">
              + add movie
            </button>
          </div>
        </div>
        <div
          className={`${cx(
            "search-title-container",
          )} row justify-content-start`}
        >
          <div className="col-auto">
            <h3 className={cx("search-title")}>FIND YOUR MOViE</h3>
          </div>
        </div>
        <div className={`${cx("search-input-container")} row`}>
          <div className="col d-flex justify-content-center">
            <div
              className={`${cx(
                "search-input-inner-container",
              )} d-flex justify-content-between`}
            >
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
