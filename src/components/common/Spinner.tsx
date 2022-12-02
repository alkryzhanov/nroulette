import { ThreeDots } from "react-loader-spinner";
import React from "react";

const Spinner = () => {
  return (
    <div className="h-96 h-full flex justify-center items-center">
      <div className="flex flex-col justify-center items-center">
        <ThreeDots
          height="80"
          width="80"
          radius="9"
          color="#f65261"
          ariaLabel="three-dots-loading"
          visible
        />
        <p>Loading...</p>
      </div>
    </div>
  );
};

export default Spinner;
