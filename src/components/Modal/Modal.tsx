import React, { useEffect, useState, useCallback } from "react";
import ReactDOM from "react-dom";
import classNames from "classnames/bind";
import { useFormik } from "formik";
import closeIcon from "../../assets/close-btn.svg";
import styles from "./Modal.module.css";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { hideModal, showModal } from "../../store/modal-slice";
import Overlay from "../Overlay/Overlay";
import { MODALS, StatusValues } from "../../constants";
import { ErrorDataType, FormikInitialValuesType } from "../../types";
import {
  updateMovie,
  addNewMovie,
  setMovieStatus,
  resetMovieDetails,
} from "../../store/movie-details-slice";

const cx = classNames.bind(styles);
const formikInitialValues: FormikInitialValuesType = {
  title: "",
  release_date: "",
  poster_path: "",
  vote_average: "",
  genres: "",
  runtime: "",
  overview: "",
};

const Modal = () => {
  const dispatch = useAppDispatch();
  const { modalType } = useAppSelector((state) => state.modal);
  const { movieDetails, movieStatus, movieErrors } = useAppSelector(
    (state) => state.movie,
  );
  const [errorData, setErrorData] = useState<ErrorDataType | null>(movieErrors);
  const [initialValues, setInitialValues] = useState(formikInitialValues);
  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      const movie = {
        ...values,
        ...(modalType === MODALS.EDIT_MODAL && { id: movieDetails!.id }),
        vote_average: +values.vote_average,
        genres: values.genres?.split(",").map((genre) => genre.trim()),
        runtime: +values.runtime,
      };

      if (modalType === MODALS.EDIT_MODAL) {
        dispatch(updateMovie(movie));
      } else {
        dispatch(addNewMovie(movie));
      }
    },
    onReset: () => {
      setInitialValues(formikInitialValues);
    },
    enableReinitialize: true,
  });

  const hideModalHandler = useCallback(() => {
    dispatch(resetMovieDetails());
    dispatch(hideModal());
  }, [dispatch]);

  const resetFormHandler = useCallback(() => {
    const modal =
      modalType === MODALS.EDIT_MODAL
        ? MODALS.CONGRATS_EDIT_MODAL
        : MODALS.CONGRATS_MODAL;

    dispatch(resetMovieDetails());
    dispatch(showModal(modal));
  }, [dispatch, modalType]);

  const modalTitle = (
    <h5 className="text-4xl font-light tracking-wide uppercase">
      {modalType === MODALS.ADD_MOVIE_MODAL ? "ADD MOVIE" : "EDIT MOVIE"}
    </h5>
  );

  useEffect(() => {
    if (
      modalType === MODALS.EDIT_MODAL &&
      movieStatus === StatusValues.SUCCEEDED
    ) {
      setInitialValues({
        title: movieDetails!.title,
        release_date: movieDetails!.release_date.toString(),
        poster_path: movieDetails!.poster_path,
        vote_average: movieDetails!.vote_average.toString(),
        genres: movieDetails!.genres.join(", "),
        runtime: movieDetails!.runtime.toString(),
        overview: movieDetails!.overview,
      });
      dispatch(setMovieStatus(StatusValues.INITIAL));
    }
    if (movieStatus === StatusValues.FAILED) {
      setErrorData(movieErrors);
      dispatch(setMovieStatus(StatusValues.INITIAL));
    }
    if (
      movieStatus === StatusValues.UPDATED ||
      movieStatus === StatusValues.ADDED
    ) {
      resetFormHandler();
    }
  }, [
    movieDetails,
    modalType,
    movieStatus,
    movieErrors,
    dispatch,
    resetFormHandler,
  ]);
  return (
    <>
      {ReactDOM.createPortal(<Overlay />, document.getElementById("overlay")!)}
      {ReactDOM.createPortal(
        <div className={cx("modal")}>
          <button
            type="button"
            className="absolute top-7 right-7"
            onClick={hideModalHandler}
          >
            <img
              src={closeIcon}
              alt="Close button"
              className="close-btn-icon"
            />
          </button>
          {modalTitle}
          <form onSubmit={formik.handleSubmit}>
            <div className="flex justify-between pt-10">
              <div className={cx("flex", "flex-col", "modal-col-left")}>
                <label htmlFor="title" className={cx("modal-heading")}>
                  title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  className={cx(
                    "modal-input",
                    "border-2",
                    `${
                      errorData?.title ? "border-red-700" : "border-transparent"
                    }`,
                  )}
                  placeholder="Movie title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                />
                {errorData?.title && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.title}
                  </span>
                )}
              </div>
              <div className={cx("flex", "flex-col", "modal-col-right")}>
                <label htmlFor="release-date" className={cx("modal-heading")}>
                  release date
                </label>
                <input
                  type="date"
                  name="release_date"
                  id="release_date"
                  placeholder="2016-12-29"
                  className={cx(
                    "modal-input",
                    "border-2",
                    `${
                      errorData?.release_date
                        ? "border-red-700"
                        : "border-transparent"
                    }`,
                  )}
                  onChange={formik.handleChange}
                  value={formik.values.release_date}
                />
                {errorData?.release_date && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.release_date}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between pt-10">
              <div className={cx("flex", "flex-col", "modal-col-left")}>
                <label htmlFor="movie-url" className={cx("modal-heading")}>
                  movie url
                </label>
                <input
                  type="text"
                  name="poster_path"
                  id="poster_path"
                  className={cx(
                    "modal-input",
                    "border-2",
                    `${
                      errorData?.poster_path
                        ? "border-red-700"
                        : "border-transparent"
                    }`,
                  )}
                  placeholder="https://"
                  onChange={formik.handleChange}
                  value={formik.values.poster_path}
                />
                {errorData?.poster_path && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.poster_path}
                  </span>
                )}
              </div>
              <div className={cx("flex", "flex-col", "modal-col-right")}>
                <label htmlFor="vote_average" className={cx("modal-heading")}>
                  rating
                </label>
                <input
                  type="text"
                  name="vote_average"
                  id="vote_average"
                  className={cx(
                    "modal-input",
                    "border-2",
                    `${
                      errorData?.vote_average
                        ? "border-red-700"
                        : "border-transparent"
                    }`,
                  )}
                  placeholder="Set the rating from 0-10"
                  onChange={formik.handleChange}
                  value={formik.values.vote_average}
                />
                {errorData?.vote_average && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.vote_average}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-between pt-10">
              <div className={cx("flex", "flex-col", "modal-col-left")}>
                <label htmlFor="genres" className={cx("modal-heading")}>
                  genre
                </label>
                <input
                  type="text"
                  name="genres"
                  id="genres"
                  placeholder="Comedy, Drama, Romance"
                  className={cx(
                    "modal-input",
                    "border-2",
                    `${
                      errorData?.genres
                        ? "border-red-700"
                        : "border-transparent"
                    }`,
                  )}
                  onChange={formik.handleChange}
                  value={formik.values.genres}
                />
                {errorData?.genres && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.genres}
                  </span>
                )}
              </div>
              <div className={cx("flex", "flex-col", "modal-col-right")}>
                <label htmlFor="runtime" className={cx("modal-heading")}>
                  runtime
                </label>
                <input
                  type="text"
                  name="runtime"
                  id="runtime"
                  className={cx(
                    "modal-input",
                    "border-2",
                    `${
                      errorData?.runtime
                        ? "border-red-700"
                        : "border-transparent"
                    }`,
                  )}
                  placeholder="minutes"
                  onChange={formik.handleChange}
                  value={formik.values.runtime}
                />
                {errorData?.runtime && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.runtime}
                  </span>
                )}
              </div>
            </div>
            <div className="w-full pt-10 relative">
              <div className="flex flex-col">
                <label htmlFor="overview" className={cx("modal-heading")}>
                  overview
                </label>
                <textarea
                  name="overview"
                  id="overview"
                  className={cx(
                    "modal-input",
                    "modal-input-overview",
                    "border-2",
                    `${
                      errorData?.overview
                        ? "border-red-700"
                        : "border-transparent"
                    }`,
                  )}
                  placeholder="Movie description"
                  onChange={formik.handleChange}
                  value={formik.values.overview}
                />
                {errorData?.overview && (
                  <span className="text-red-600 text-sm absolute -bottom-6 left-4">
                    {errorData?.overview}
                  </span>
                )}
              </div>
            </div>
            <div className="flex justify-end  pt-14 items-center">
              {/* eslint-disable-next-line react/button-has-type */}
              <button
                type="reset"
                className={cx("reset-btn")}
                name="reset-btn"
                onClick={() => formik.resetForm()}
              >
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
          </form>
        </div>,
        document.getElementById("modal")!,
      )}
    </>
  );
};

export default Modal;
