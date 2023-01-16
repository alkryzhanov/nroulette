import React from "react";
import { useFormik } from "formik";
import classNames from "classnames/bind";
import { useSearchParams } from "react-router-dom";
import Logo from "../Logo/Logo";
import { useAppDispatch } from "../../hooks";
import { showModal } from "../../store/modal-slice";
import { MODALS } from "../../constants";
import styles from "../Header/Header.module.css";

const cx = classNames.bind(styles);
const Search = () => {
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const formik = useFormik({
    initialValues: { searchInput: "" },
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => {
      if (!values.searchInput) {
        searchParams.delete("search");
        searchParams.delete("searchBy");

        searchParams.set("sortBy", "release_date");
        searchParams.set("sortOrder", "asc");
        setSearchParams(searchParams, { replace: true });

        return;
      }

      searchParams.delete("filter");

      searchParams.set("search", values.searchInput);
      searchParams.set("searchBy", "title");
      setSearchParams(searchParams, { replace: true });
    },
  });
  const onClickHandler = () => {
    dispatch(showModal(MODALS.ADD_MOVIE_MODAL));
  };

  const searchHeader = (
    <>
      <Logo />
      <button
        type="button"
        className={cx("add-btn", "bg-gray-one")}
        name="add-btn"
        onClick={onClickHandler}
      >
        + add movie
      </button>
    </>
  );
  const searchBody = (
    <div className="w-full max-w-6xl">
      <h3 className={cx("search-title")}>FIND YOUR MOVIE</h3>
      <form onSubmit={formik.handleSubmit}>
        <div className="flex justify-between pt-10 relative">
          <input
            type="text"
            name="searchInput"
            className={cx("search-input")}
            placeholder="What do you want to watch?"
            onChange={formik.handleChange}
            value={formik.values.searchInput}
          />
          <button
            type="submit"
            className={cx("search-btn", "bg-radical-red")}
            name="search-btn"
          >
            search
          </button>
        </div>
      </form>
    </div>
  );
  return (
    <>
      <div className="flex justify-between items-center">{searchHeader}</div>
      <div className="flex justify-center pt-9">{searchBody}</div>
    </>
  );
};

export default Search;
