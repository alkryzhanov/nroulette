import React, { Dispatch, SetStateAction } from "react";
import classNames from "classnames/bind";
import Logo from "../Logo/Logo";
import styles from "./Header.module.css";

type Props = {
  onAddClick: Dispatch<SetStateAction<boolean>>;
};
const cx = classNames.bind(styles);

const Header = ({ onAddClick }: Props) => {
  const onAddClickHandler = () => {
    onAddClick(true);
  };
  return (
    <header className={cx("header-section")}>
      <div className="container mx-auto">
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
      </div>
    </header>
  );
};

export default Header;
