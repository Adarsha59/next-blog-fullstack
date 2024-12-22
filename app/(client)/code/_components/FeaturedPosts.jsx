import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import { FaHeart, FaClock } from "react-icons/fa";

const FeaturedPosts = ({ posts, title }) => {
  const router = useRouter();
  // Function to calculate read time based on the content length
  const calculateReadTime = (content, wordsPerMinute = 238) => {
    if (!content || typeof content !== "string") return 0; // Return 0 for invalid input

    // Extract text content by removing HTML tags
    const textContent = content.replace(/<[^>]*>/g, " ");
    const cleanedData = textContent.replace(/&nbsp;/g, " ");

    // Step 2: Remove extra spaces and trim
    const normalizedData = cleanedData.replace(/\s+/g, "    ").trim();

    // Step 3: Count words
    // const wordCount = normalizedData.split(/\s+/).length;
    console.log("pure", cleanedData); // Remove all HTML tags
    const wordCount = normalizedData.trim().split(/\s+/).length; // Split by whitespace to count words

    // Calculate and return the reading time in minutes
    return Math.ceil(wordCount / wordsPerMinute);
  };
  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)/g, ""); // Remove hyphens at the beginning or end
  };

  const navigateToPost = (title, id) => {
    const slug = slugify(title);
    router.push(`/code/blog/${slug}/${id}`);
  };
  const truncateDescription = (description, wordLimit = 12) => {
    const words = description.split(/\s+/); // Split by whitespace to get an array of words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "...."; // Return only the first 12 words with "..."
    }
    return description; // Return the whole description if it's shorter than 12 words
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        {title ? <>{title}</> : "Featured Posts"}
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
                <button
                  className="text-left"
                  onClick={() => navigateToPost(post.title, post._id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                </button>
                <p className="text-sm text-gray-500 mb-2">By {post.author}</p>

                <p className="dark:text-white/70 text-black/70 text-sm mb-4">
                  {/* {post.description} */}
                  {truncateDescription(post.description)}
                </p>

                <div className="flex items-center text-sm dark:text-white/50 text-black/50">
                  <FiClock className="mr-2" />
                  <span className="mr-4">
                    {calculateReadTime(post.content)} min read
                  </span>
                  <FaHeart className="mr-2 text-red-500" />
                  <span>{post.likes}</span>
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
