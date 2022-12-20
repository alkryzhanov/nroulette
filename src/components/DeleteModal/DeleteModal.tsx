import React, { useCallback, useEffect } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import Overlay from "../Overlay/Overlay";
import { hideModal, showModal } from "../../store/modal-slice";
import { useAppDispatch, useAppSelector } from "../../hooks";
import closeIcon from "../../assets/close-btn.svg";
import styles from "./DeleteModal.module.css";
import { MODALS, StatusValues } from "../../constants";
import {
  deleteMovie,
  resetMovieDetails,
} from "../../store/movie-details-slice";

const cx = classNames.bind(styles);

const DeleteModal = () => {
  const dispatch = useAppDispatch();
  const { movieId, movieStatus } = useAppSelector((state) => state.movie);
  const closeDeleteModalHandler = () => {
    dispatch(hideModal());
    dispatch(resetMovieDetails());
  };
  const deleteMovieHandler = () => {
    dispatch(deleteMovie(movieId));
  };

  const resetHandle = useCallback(() => {
    dispatch(resetMovieDetails());
    dispatch(showModal(MODALS.CONGRATS_DELETE_MODAL));
  }, [dispatch]);

  useEffect(() => {
    if (movieStatus === StatusValues.DELETED) {
      resetHandle();
    }
  }, [movieStatus, resetHandle]);
  return (
    <>
      {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay")!)}
      {ReactDOM.createPortal(
        <div className={cx("delete-modal")}>
          <button
            type="button"
            className={cx("delete-model-close-btn")}
            onClick={closeDeleteModalHandler}
          >
            <img src={closeIcon} alt="Close button" />
          </button>
          <h5 className={cx("delete-modal-title")}>Delete MOVIE</h5>
          <p className={cx("delete-modal-text")}>
            Are you sure you want to delete this movie?
          </p>
          <button
            type="button"
            className={cx("confirm-btn")}
            name="confirm-btn"
            onClick={deleteMovieHandler}
          >
            confirm
          </button>
        </div>,
        document.getElementById("modal")!,
      )}
    </>
  );
};

export default DeleteModal;
