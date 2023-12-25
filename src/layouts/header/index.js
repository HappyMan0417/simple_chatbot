import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <header className="py-6 px-8 border-b bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center font-semibold">
        <Link to="/" className="flex items-center">
          <img src="logo.png" width={"40px"} className="mr-2" alt="" />
          <span className="md:text-3xl text-indigo-700 tracking-tight font-bold text-xl">
            Sales Bot
          </span>
        </Link>
        <div className="relative md:hidden">
          <button
            className="md:hidden my-auto"
            onClick={() => setIsOpen(!isOpen)}
          >
            <FaBars />
          </button>
          {isOpen && (
            <div className="absolute right-0 w-48 py-2 mt-2 bg-white rounded-lg shadow-xl">
              <Link
                to="/blog"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Blog
              </Link>
              <Link
                to="/chatbot"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                Chatbot
              </Link>
              <Link
                to="/about"
                onClick={handleLinkClick}
                className="block px-4 py-2 text-gray-800 hover:bg-indigo-500 hover:text-white"
              >
                About
              </Link>
            </div>
          )}
        </div>
        <nav className="hidden md:flex space-x-8"></nav>
      </div>
    </header>
  );
};

export default Header;
