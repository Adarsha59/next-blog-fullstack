"use client"
import React, { useState, useEffect } from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMoon, FaSun, FaBars, FaTimes, FaSearch } from "react-icons/fa";

const BlogWebsite = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const blogPosts = [
    {
      id: 1,
      title: "The Art of Modern Web Design",
      description: "Exploring the latest trends in web design and development.",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
    },
    {
      id: 2,
      title: "Understanding React Hooks",
      description: "A deep dive into React's most powerful features.",
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c"
    },
    {
      id: 3,
      title: "Mastering Tailwind CSS",
      description: "Learn how to create beautiful websites with Tailwind CSS.",
      image: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8"
    }
  ];

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? "dark:bg-gray-900 dark:text-white" : "bg-white"}`}>
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center">
            <h1 className="text-3xl font-bold mb-4">Blog Logo</h1>
            <div className="flex space-x-4 mb-4">
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
                  <li><a href="#" className="hover:text-blue-500">Home</a></li>
                  <li><a href="#" className="hover:text-blue-500">About</a></li>
                  <li><a href="#" className="hover:text-blue-500">Blog</a></li>
                  <li><a href="#" className="hover:text-blue-500">Contact</a></li>
                  <li><a href="#" className="hover:text-blue-500">Archives</a></li>
                </ul>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="hover:text-blue-500"
                >
                  <FaSearch size={20} />
                </button>
                <button
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="hover:text-blue-500"
                >
                  {isDarkMode ? <FaSun size={20} /> : <FaMoon size={20} />}
                </button>
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
      <main className="container mx-auto px-4 py-8">
        {/* Newsletter CTA */}
        <div className="bg-blue-500 text-white p-8 rounded-lg mb-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="mb-4">Stay updated with our latest blog posts and news!</p>
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-auto px-4 py-2 rounded-lg text-gray-900"
            />
            <button className="bg-white text-blue-500 px-6 py-2 rounded-lg hover:bg-blue-100 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition duration-300 hover:shadow-xl">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 hover:text-blue-500 transition duration-300">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.description}</p>
                <button className="text-blue-500 hover:text-blue-700 font-semibold transition duration-300">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 mt-12">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-600 dark:text-gray-300">Your go-to source for web development insights and tutorials.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-pink-600 cursor-pointer" />
                <FaLinkedin className="text-2xl hover:text-blue-800 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-300">&copy; 2024 Blog Website. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BlogWebsite;