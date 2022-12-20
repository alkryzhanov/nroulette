import React from "react";
import classNames from "classnames/bind";
import ReactDOM from "react-dom";
import closeIcon from "../../assets/close-btn.svg";
import styles from "../Modal/Modal.module.css";
import { useAppDispatch } from "../../hooks";
import { hideModal } from "../../store/modal-slice";
import Overlay from "../Overlay/Overlay";

const cx = classNames.bind(styles);

const EditModal = () => {
  const dispatch = useAppDispatch();
  const onCloseHandler = () => {
    dispatch(hideModal());
  };
  return (
    <>
      {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay")!)}
      {ReactDOM.createPortal(
        <div className={cx("modal")}>
          <button
            type="button"
            className="absolute top-7 right-7"
            onClick={onCloseHandler}
          >
            <img
              src={closeIcon}
              alt="Close button"
              className="close-btn-icon"
            />
          </button>
          <h5 className="text-4xl font-light tracking-wide uppercase">
            EDIT MOVIE
          </h5>
          <div className="flex justify-between pt-10">
            <div className={cx("flex", "flex-col", "modal-col-left")}>
              <label htmlFor="title" className={cx("modal-heading")}>
                title
              </label>
              <input
                type="input"
                name="title"
                id="title"
                className={cx("modal-input")}
                placeholder="Movie title"
              />
            </div>
            <div className={cx("flex", "flex-col", "modal-col-right")}>
              <label htmlFor="release-date" className={cx("modal-heading")}>
                release date
              </label>
              <input
                type="input"
                name="release-date"
                id="release-date"
                className={cx("modal-input")}
              />
            </div>
          </div>
          <div className="flex justify-between pt-10">
            <div className={cx("flex", "flex-col", "modal-col-left")}>
              <label htmlFor="movie-url" className={cx("modal-heading")}>
                movie url
              </label>
              <input
                type="input"
                name="movie-url"
                id="movie-url"
                className={cx("modal-input")}
                placeholder="https://"
              />
            </div>
            <div className={cx("flex", "flex-col", "modal-col-right")}>
              <label htmlFor="rating" className={cx("modal-heading")}>
                rating
              </label>
              <input
                type="input"
                name="rating"
                id="rating"
                className={cx("modal-input")}
                placeholder="Set the rating from 0-10"
              />
            </div>
          </div>
          <div className="flex justify-between pt-10">
            <div className={cx("flex", "flex-col", "modal-col-left")}>
              <label htmlFor="genre" className={cx("modal-heading")}>
                genre
              </label>
              <input
                type="input"
                name="genre"
                id="genre"
                className={cx("modal-input")}
              />
            </div>
            <div className={cx("flex", "flex-col", "modal-col-right")}>
              <label htmlFor="runtime" className={cx("modal-heading")}>
                runtime
              </label>
              <input
                type="input"
                name="runtime"
                id="runtime"
                className={cx("modal-input")}
                placeholder="minutes"
              />
            </div>
          </div>
          <div className="w-full pt-10">
            <div className="flex flex-col">
              <label htmlFor="overview" className={cx("modal-heading")}>
                overview
              </label>
              <textarea
                name="overview"
                id="overview"
                className={cx("modal-input", "modal-input-overview")}
                placeholder="Movie description"
              />
            </div>
          </div>
          <div className="flex justify-end pt-14">
            <button type="button" className={cx("reset-btn")} name="reset-btn">
              reset
            </button>
            <button
              type="submit"
              className={cx("submit-btn")}
              name="submit-btn"
            >
              submit
            </button>
          </div>
        </div>,
        document.getElementById("modal")!,
      )}
    </>
  );
};

export default EditModal;
