"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaClock,
  FaUser,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

const BlogPost = ({ params }) => {
  const { id } = params;
  console.log("object", id);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.post("/api/blog/oneread", { id });
        const posts = response.data.data;
        // setPosts(posts);
        console.log("one ", response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [id]);
  const [isScrolled, setIsScrolled] = useState(false);

  const post = {
    title: "Understanding Modern Web Development",
    category: "Technology",
    author: {
      name: "John Doe",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
      bio: "Senior Web Developer with 10+ years of experience in building scalable applications.",
    },
    date: "March 15, 2024",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    mainImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
    tags: ["Web Development", "React", "JavaScript", "Frontend"],
    comments: [
      {
        id: 1,
        author: "Jane Smith",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        content: "Great article! Very informative.",
        date: "March 16, 2024",
      },
    ],
    relatedPosts: [
      {
        id: 1,
        title: "Getting Started with React Hooks",
        image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4",
      },
      {
        id: 2,
        title: "Advanced TypeScript Patterns",
        image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c",
      },
    ],
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-all duration-300">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4">
            <img
              src={post.author.image}
              alt={post.author.name}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <FaClock className="mr-2" />
                {post.date}
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
              <FaFacebook className="text-blue-600 dark:text-blue-400" />
            </button>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
              <FaTwitter className="text-blue-400 dark:text-blue-300" />
            </button>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
              <FaLinkedin className="text-blue-700 dark:text-blue-500" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <img
          src={post.mainImage}
          alt="Blog Cover"
          className="w-full h-96 object-cover rounded-xl mb-8 transition-transform duration-300 hover:scale-[1.02]"
        />

        <article className="prose lg:prose-xl max-w-none text-gray-900 dark:text-white">
          <p>{post.content}</p>
        </article>

        {/* Callout Box */}
        <div className="my-8 p-6 bg-white/80 backdrop-blur-lg rounded-xl shadow-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            Important Note
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            This is a special callout box for important information.
          </p>
        </div>

        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          <form className="mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <textarea
              placeholder="Your comment"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors">
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800 dark:text-white"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {comment.date}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Posts */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.relatedPosts.map((relatedPost) => (
              <div key={relatedPost.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {relatedPost.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Author Bio */}
        <section className="mt-12 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            About the Author
          </h3>
          <div className="flex items-center space-x-4">
            <img
              src={post.author.image}
              alt={post.author.name}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {post.author.bio}
              </p>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-12">
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
            <FaChevronLeft />
            <span>Previous</span>
          </button>
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
            <span>Next</span>
            <FaChevronRight />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;
