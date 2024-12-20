import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiExternalLink } from "react-icons/fi";

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

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

  const handleSearch = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setResults(dummyData);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Search Bar Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <form onSubmit={handleSearch} className="relative">
            <div className="relative">
              <input
                type="text"
                className="w-full p-4 pl-12 pr-4 rounded-full border border-gray-300 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-300"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search input"
              />
              <FiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300"
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
        {!isLoading && results.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((result) => (
              <div
                key={result.id}
                className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg"
              >
                <div className="relative h-48">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src =
                        "https://images.unsplash.com/photo-1531297484001-80022131f5a1";
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{result.title}</h3>
                  <p className="text-gray-600 mb-4">{result.description}</p>
                  <button
                    className="inline-flex items-center text-blue-600 hover:text-blue-800 transition duration-300"
                    aria-label={`View ${result.title}`}
                  >
                    View Details
                    <FiExternalLink className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

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
