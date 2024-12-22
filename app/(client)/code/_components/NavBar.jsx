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
  FaGithub,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import ToggleTheme from "./ToggleTheme";
import Link from "next/link";
import RecentPosts from "./RecentPosts";
import axios from "axios";
import Search from "./SearchCard";
import { useRouter } from "next/navigation";
import { SignOutButton, useAuth, useUser } from "@clerk/nextjs";

const BlogWebsite = () => {
  // const { user } = useUser();
  // console.log("username", user);
  const { user } = useUser();

  // console.log("First Name:", user.firstName);
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
              <Link href="https://www.facebook.com/paudyaladarsha" passHref>
                <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
              </Link>
              <Link href="https://x.com/Adarsha59" passHref>
                <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
              </Link>
              <Link href="https://github.com/Adarsha59" passHref>
                <FaGithub className="text-2xl hover:text-pink-600 cursor-pointer" />
              </Link>
              <Link href="https://www.linkedin.com/in/adarshapaudyal" passHref>
                <FaLinkedin className="text-2xl hover:text-blue-800 cursor-pointer" />
              </Link>
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
                  {user ? (
                    <li>
                      <a
                        href={`/admin/${user.firstName}/dashboard`}
                        className=" text-red-800 font-bold hover:text-yellow-500"
                      >
                        {user.firstName}'s Admin
                      </a>
                    </li>
                  ) : null}
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
                  // Use SignOutButton directly for logout functionality
                  <SignOutButton>
                    <button className="text-red-500 px-2 py-2 font-semibold border-b-2 border-transparent hover:border-blue-500 transition duration-200">
                      Logout
                    </button>
                  </SignOutButton>
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
