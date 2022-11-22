import React from "react";
import classNames from "classnames/bind";
import styles from "./Filter.module.css";

const cx = classNames.bind(styles);

const Filter = () => {
  return (
    <nav className="flex justify-between text-base text-white font-medium uppercase py-5">
      <ul className="flex justify-between max-w-md w-full">
        <li>
          <a href="/#" className={cx("nav-link", "nav-link__active")}>
            All
          </a>
        </li>
        <li>
          <a href="/#" className={cx("nav-link")}>
            Documentary
          </a>
        </li>
        <li>
          <a href="/#" className={cx("nav-link")}>
            Comedy
          </a>
        </li>
        <li>
          <a href="/#" className={cx("nav-link")}>
            Horror
          </a>
        </li>
        <li>
          <a href="/#" className={cx("nav-link")}>
            Crime
          </a>
        </li>
      </ul>
      <div className="sorting-wrapper tracking-wider">
        <span className="font-normal mr-8">Sort by</span>
        <select
          name="sorting"
          className="bg-transparent uppercase border-0"
          defaultValue="release-date"
        >
          <option value="release-date">Release date</option>
          <option value="genre" selected>
            Genre
          </option>
          <option value="title">Title</option>
        </select>
      </div>
    </nav>
  );
};

export default Filter;
