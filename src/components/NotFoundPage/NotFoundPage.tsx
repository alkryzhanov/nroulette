import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <h1 className="text-red-600 text-9xl">404</h1>
      <h3>Page Not Found</h3>
      <p>
        <Link to="/" className="underline text-neutral-300">
          Click here to go Home
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
