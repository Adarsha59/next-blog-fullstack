"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import ToggleTheme from "./ToggleTheme";

const BlogWebsite = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="  ">
      {/* Header */}
      <header className="sticky top-0 z-50  bg-opacity-30 backdrop-blur-lg   shadow-lg">
        {/* Your header content */}

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Blog </h1>
            <Image src="/images/logo.svg" width={200} height={200} />
            <div className="pt-10"> </div>

            <div className="flex space-x-4 mb-9">
              <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
              <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
              <FaInstagram className="text-2xl hover:text-pink-600 cursor-pointer" />
              <FaLinkedin className="text-2xl hover:text-blue-800 cursor-pointer" />
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-4">
            <div className="flex justify-between items-center">
              <button
                className="md:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
              </button>

              <div className={`${isMenuOpen ? "block" : "hidden"} md:block`}>
                <ul className="flex flex-col md:flex-row md:space-x-6 space-y-2 md:space-y-0">
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/code/about" className="hover:text-blue-500">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      Archives
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hover:text-blue-500"
                >
                  <FaSearch size={20} />
                </button>
                <ToggleTheme />
              </div>
            </div>
          </nav>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="mt-4">
              <input
                type="text"
                placeholder="Search blog posts..."
                className="w-full p-2 border rounded-lg focus:outline-none focus:border-blue-500 dark:bg-gray-700"
              />
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
    </div>
  );
};

export default BlogWebsite;
