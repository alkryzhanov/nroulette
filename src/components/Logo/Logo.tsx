import React from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";

const Logo = () => {
  const { movieId } = useParams();
  const clsName = classNames(
    ...["text-xl", "leading-6", "m-0", "text-radical-red"],
    {
      "font-light": movieId,
      "font-black": !movieId,
    },
  );

  return (
    <h1 className={clsName}>
      netflix
      <span className={`${movieId ? "font-light" : "font-medium"}`}>
        roulette
      </span>
    </h1>
  );
};

export default Logo;
