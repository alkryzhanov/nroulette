import React from "react";

type LogoProps = {
  isMovieDetailsShow?: boolean;
} & typeof defaultProps;

const defaultProps = {
  isMovieDetailsShow: false,
};

const Logo = ({ isMovieDetailsShow }: LogoProps) => {
  const clsHeader = `text-xl leading-6 m-0 text-radical-red 
  ${isMovieDetailsShow ? "font-light" : "font-black"}`;
  const clsSpan = `${isMovieDetailsShow ? "font-light" : "font-medium"}`;

  return (
    <h1 className={clsHeader}>
      netflix
      <span className={clsSpan}>roulette</span>
    </h1>
  );
};

Logo.defaultProps = defaultProps;
export default Logo;
