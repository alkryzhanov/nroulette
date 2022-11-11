import React from "react";

const Filter = () => {
  return (
    <div className="container mx-auto">
      <nav className="flex justify-between text-base text-white font-medium uppercase pt-5">
        <ul className="flex justify-between max-w-md w-full">
          <li>
            <a href="/#" className="nav-link">
              All
            </a>
          </li>
          <li>
            <a href="/#" className="nav-link">
              Documentary
            </a>
          </li>
          <li>
            <a href="/#" className="nav-link">
              Comedy
            </a>
          </li>
          <li>
            <a href="/#" className="nav-link">
              Horror
            </a>
          </li>
          <li>
            <a href="/#" className="nav-link">
              Crime
            </a>
          </li>
        </ul>
        <div className="sorting-wrapper tracking-wider">
          <span className="font-normal mr-8">Sort by</span>
          <select name="sorting" className="bg-transparent uppercase border-0">
            <option value="release-date" selected>
              Release date
            </option>
            <option value="genre" selected>
              Genre
            </option>
            <option value="title">Title</option>
          </select>
        </div>
      </nav>
    </div>
  );
};

export default Filter;
