import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useLocation, useSearchParams, NavLink } from "react-router-dom";
import classNames from "classnames/bind";
import styles from "./Filter.module.css";
import { MOVIES_URL, SortingOptions } from "../../constants";
import { fetchAllMovies } from "../../store/movies-slice";
import { useAppDispatch } from "../../hooks";

const cx = classNames.bind(styles);

const Filter = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const firstMoviesRequest = useRef(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [sortBy, setSortBy] = useState<string>(SortingOptions.ReleaseDate);
  const [filter, setFilter] = useState<string>("all");
  const [sortOrder] = useState<string>("asc");

  const removeSearchQuery = useCallback(() => {
    if (searchParams.has("searchBy")) {
      searchParams.delete("searchBy");
    }
    if (searchParams.has("search")) {
      searchParams.delete("search");
    }
  }, [searchParams]);
  const sortingHandler = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(evt.target.value);

    searchParams.set("sortBy", evt.target.value);
    setSearchParams(searchParams, { replace: true });
  };
  const filterHandler = useCallback(
    (filterProps: string) => {
      removeSearchQuery();

      setFilter(filterProps);
    },
    [removeSearchQuery],
  );

  // Movies request on first page loading
  useEffect(() => {
    if (firstMoviesRequest.current) {
      searchParams.set("sortBy", sortBy);
      searchParams.set("sortOrder", sortOrder);
      setSearchParams(searchParams);

      firstMoviesRequest.current = false;
    }
  }, [sortOrder, setSearchParams, sortBy, searchParams]);

  useEffect(() => {
    if (location.search) {
      dispatch(fetchAllMovies(`${MOVIES_URL}${location.search}`));
    }
  }, [dispatch, location.search]);

  const memoizedFilters = useMemo(() => {
    const filters = ["all", "documentary", "comedy", "horror", "crime"];

    return filters.map((filtersItem) => {
      const searchLink =
        filtersItem === "all"
          ? `/search?sortBy=${sortBy}&sortOrder=${sortOrder}`
          : `/search?sortBy=${sortBy}&sortOrder=${sortOrder}&filter=${filtersItem}`;

      const className = cx("nav-link", {
        "nav-link__active": filtersItem === filter,
      });

      const navLink = (
        <NavLink
          to={searchLink}
          className={className}
          onClick={() => filterHandler(filtersItem)}
        >
          {filtersItem}
        </NavLink>
      );

      const listItemBody = searchParams.has("search") ? (
        <span className="text-slate-600">{filtersItem}</span>
      ) : (
        navLink
      );
      return <li key={filtersItem}>{listItemBody}</li>;
    });
  }, [filter, searchParams, filterHandler, sortBy, sortOrder]);
  return (
    <nav className="flex justify-between text-base text-white font-medium uppercase py-5">
      <ul className="flex justify-between max-w-md w-full">
        {memoizedFilters}
      </ul>
      <div className="sorting-wrapper tracking-wider">
        <span className="font-normal mr-8">Sort by</span>
        <select
          name="sorting"
          className="bg-transparent uppercase border-0"
          onChange={sortingHandler}
          value={sortBy}
        >
          <option value={SortingOptions.ReleaseDate}>Release date</option>
          <option value={SortingOptions.Title}>Title</option>
        </select>
      </div>
    </nav>
  );
};

export default Filter;
