import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full flex items-center justify-center text-indigo-700">
      <div className="text-center">
        <h1 className="text-6xl font-bold">404</h1>
        <p className="text-xl mt-4">Oops! Page not found.</p>
        <p className="text-lg mt-2 mb-10">
          We could not find the page you were looking for.
        </p>
        <Link
          to={"/"}
          className="text-white bg-indigo-700 py-2 px-6 rounded-full font-semibold hover:bg-indigo-800 transition-colors duration-200"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
