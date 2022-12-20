import React from "react";
import classNames from "classnames/bind";
import styles from "./Overlay.module.css";

const cx = classNames.bind(styles);
const Overlay = () => {
  return <div className={cx("overlay")} />;
};

export default Overlay;
