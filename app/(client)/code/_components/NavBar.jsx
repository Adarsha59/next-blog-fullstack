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
import Link from "next/link";
import RecentPosts from "./RecentPosts";
import axios from "axios";
import Search from "./SearchCard";
import { useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";

const BlogWebsite = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const gosearch = () => {
    router.push(`/code/search`);
  };

  return (
    <div className="  ">
      {/* Header */}
      <header className="sticky top-0 z-50  bg-opacity-30 backdrop-blur-lg   shadow-lg">
        {/* Your header content */}

        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Blog </h1>
            <Link href="/code">
              <Image
                src="/images/logo.svg"
                alt="logo"
                width={200}
                height={200}
              />
              <div className="pt-10"> </div>
            </Link>

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
                    <a href="/code" className="hover:text-blue-500">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="/code/about" className="hover:text-blue-500">
                      About
                    </a>
                  </li>
                  <li>
                    <a href="/code/allblog" className="hover:text-blue-500">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      Contact
                    </a>
                  </li>
                  <li>
                    <a href="/admin/dashboard" className="hover:text-blue-500">
                      Admin
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex items-center space-x-4">
                <button onClick={gosearch} className="hover:text-blue-500">
                  <FaSearch size={20} />
                </button>
                <ToggleTheme />
                {!user ? (
                  <Link
                    href="/sign-in"
                    className="text-blue-500 px-2 py-2 font-semibold border-b-2 border-transparent hover:border-blue-500  transition duration-200"
                  >
                    Login
                  </Link>
                ) : (
                  <button
                    onClick={() => signOut()}
                    className="text-red-500 px-2 py-2 font-semibold border-b-2 border-transparent hover:border-blue-500  transition duration-200"
                  >
                    Logout
                  </button>
                )}
                {/* <button class="text-green-500 px-2 py-2 font-semibold border-b-2 border-transparent hover:border-green-500  transition duration-200">
                  Signup
                </button> */}
              </div>
            </div>
          </nav>
        </div>
      </header>

      {/* Main Content */}
    </div>
  );
};

export default BlogWebsite;
