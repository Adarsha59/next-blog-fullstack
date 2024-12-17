import React, { useState } from "react";
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";

const FeaturedPosts = ({ posts }) => {
  // Function to calculate read time based on the content length
  const calculateReadTime = (content) => {
    if (!content) return 0; // Return 0 if content is empty or undefined

    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split("").length;
    console.log("time", Math.ceil(wordCount / wordsPerMinute)); // Split content into words
    return Math.ceil(wordCount / wordsPerMinute); // Rounding up to the nearest minute
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Featured Posts
      </h2>
      <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              key={post._id} // Use the unique _id from the post object
              className="min-w-[300px] max-w-[300px] rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 overflow-hidden dark:hover:border-white/30 hover:border-white/30 transition-all duration-300 hover:scale-105 snap-start"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="dark:text-white/70 text-black/70 text-sm mb-4">
                  {post.description}
                </p>
                <div className="flex items-center text-sm dark:text-white/50 text-black/50">
                  <FiClock className="mr-2" />
                  <span className="mr-4">
                    {calculateReadTime(post.content)} min read
                  </span>
                  <FiMessageCircle className="mr-2" />
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No featured posts available</p>
        )}
      </div>
    </section>
  );
};

export default FeaturedPosts;
