import React from "react";
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import PopularTags from "./PopularTags";
import Link from "next/link";
import BlogPost from "../blog/[slug]/[id]/page";
import { useRouter } from "next/navigation";
const RecentPosts = ({ posts }) => {
  const router = useRouter();
  const calculateReadTime = (content) => {
    if (!content) return 0; // Return 0 if content is empty or undefined

    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.split("").length;
    console.log("time", Math.ceil(wordCount / wordsPerMinute)); // Split content into words
    return Math.ceil(wordCount / wordsPerMinute); // Rounding up to the nearest minute
  };

  const truncateDescription = (description, wordLimit = 20) => {
    const words = description.split(/\s+/); // Split by whitespace to get an array of words
    if (words.length > wordLimit) {
      return words.slice(0, wordLimit).join(" ") + "..."; // Return only the first 12 words with "..."
    }
    return description; // Return the whole description if it's shorter than 12 words
  };
  const slugify = (text) => {
    return text
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)/g, ""); // Remove hyphens at the beginning or end of the string
  };
  const navigateToPost = (title, id) => {
    const slug = slugify(title);
    router.push(`/code/blog/${slug}/${id}`); // Passing id in hidden state
  };
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Recent Posts
        </h2>
        <div className="space-y-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="p-6 rounded-xl bg-white/5 border dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-white/30 transition-all duration-300"
            >
              <button
                onClick={() => navigateToPost(post.title, post._id)}
                className="text-left"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              </button>
              <p className="text-sm text-gray-500 mb-2">By {post.author}</p>

              <p className="dark:text-white/70 text-black/70  mb-4">
                {/* {post.description} */}
                {truncateDescription(post.description)}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className="flex items-center text-sm dark:text-white/50 text-red/50">
                <span className="mr-4">
                  {new Date(post.createdAt).toLocaleDateString()}
                </span>
                <FiClock className="mr-2" />
                <span className="mr-4">
                  {calculateReadTime(post.content)} min read
                </span>
                <FiMessageCircle className="mr-2" />
                <span>{post.comments.length} comments</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <PopularTags />

        {/* Subscribe Section */}
        <div className="mt-12 p-6 rounded-xl bg-white/5 border dark:border-white/10 border-black/10">
          <h3 className="text-2xl font-bold mb-4">Subscribe to Newsletter</h3>
          <p className="text-white/70 mb-6">
            Get the latest posts delivered right to your inbox.
          </p>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 outline-none mb-4"
          />
          <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium hover:scale-105">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecentPosts;
