"use client";
import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import SearchCard from "../_components/SearchCard";
import axios from "axios";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchQuery === "") {
      setResults([]);
      return;
    }

    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/blog/read");
        const published = response.data.data;
        const posts = published.filter((post) => post.status === "published"); // Filter posts with 'published' status

        // Filter posts where the title includes the search query (case insensitive)
        const filteredPosts = posts.filter((post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setResults(filteredPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [searchQuery]);

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call (for dummy data)
    setTimeout(() => {
      setResults(dummyData);
      setIsLoading(false);
    }, 1500);
  };

  const dummyData = [
    {
      id: 1,
      title: "Mountain Adventure Guide",
      description: "Discover the best hiking trails and mountain adventures.",
      image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    },
    {
      id: 2,
      title: "Urban Photography Tips",
      description: "Expert tips for capturing stunning city landscapes.",
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000",
    },
    {
      id: 3,
      title: "Coastal Destinations",
      description: "Explore beautiful beaches and coastal attractions.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    },
    {
      id: 4,
      title: "Food Culture Guide",
      description: "Explore local cuisines and food traditions worldwide.",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                className="w-full bg-transparent p-4 pl-12 pr-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-300"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search input"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
              aria-label="Submit search"
            >
              Search
            </button>
          </form>
        </div>

        {/* Loader */}
        {isLoading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}

        {/* Results Section */}
        {!isLoading && results.length > 0 && <SearchCard posts={results} />}

        {/* No Results Message */}
        {!isLoading && searchQuery && results.length === 0 && (
          <div className="text-center text-gray-600 mt-8">
            No results found for "{searchQuery}"
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
