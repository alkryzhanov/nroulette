import React, { useEffect, useState } from "react";
import classNames from "classnames/bind";
import styles from "./Filter.module.css";
import { SortingOptions } from "../../constants";
import { useAppDispatch } from "../../hooks";
import { fetchAllMovies } from "../../store/movies-slice";

const cx = classNames.bind(styles);

const Filter = () => {
  const filterLinks = ["all", "documentary", "comedy", "horror", "crime"];
  const INITIAL_FILTER = "all";

  const [sorting, setSorting] = useState<string>(SortingOptions.ReleaseDate);
  const [filter, setFilter] = useState<string>(INITIAL_FILTER);
  const dispatch = useAppDispatch();
  const sortingHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSorting(evt.target.value);
  };
  const filterHandler = (evt: React.BaseSyntheticEvent) => {
    evt.preventDefault();
    setFilter(evt.target.dataset.filter);
  };

  useEffect(() => {
    let query: string = "";

    if (sorting) {
      query = `${query}&sortBy=${sorting}`;
    }
    if (filter.toLowerCase() !== INITIAL_FILTER) {
      query = `${query}&filter=${filter}`;
    }

    dispatch(fetchAllMovies(query));
  }, [dispatch, sorting, filter]);
  return (
    <nav className="flex justify-between text-base text-white font-medium uppercase py-5">
      <ul className="flex justify-between max-w-md w-full">
        {filterLinks.map((link) => {
          return (
            <li key={link}>
              <a
                href="/#"
                className={cx("nav-link", {
                  "nav-link__active": link === filter,
                })}
                onClick={filterHandler}
                data-filter={link}
              >
                {link}
              </a>
            </li>
          );
        })}
      </ul>
      <div className="sorting-wrapper tracking-wider">
        <span className="font-normal mr-8">Sort by</span>
        <select
          name="sorting"
          className="bg-transparent uppercase border-0"
          onChange={sortingHandler}
          value={sorting}
        >
          <option value={SortingOptions.ReleaseDate}>Release date</option>
          <option value={SortingOptions.Title}>Title</option>
        </select>
      </div>
    </nav>
  );
};

export default Filter;
