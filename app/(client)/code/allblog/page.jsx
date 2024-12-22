"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart, FaClock } from "react-icons/fa";

const BlogPosts = () => {
  const router = useRouter();
  const [blogPosts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const published = response.data.data;
        const posts = published.filter((post) => post.status === "published"); // Filter posts with 'published' status
        setPosts(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

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

  return (
    <div className="min-h-screen bg-transparent py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold  mb-12 text-center">
          All Blog Posts
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <button
              key={post._id}
              onClick={() => navigateToPost(post.title, post._id)}
              className=" text-left dark:bg-transparent bg-white border-2 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105"
            >
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <FaClock className="text-gray-400" />
                  <span className="text-sm text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <h2 className="text-xl font-semibold  mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-500 mb-2">By {post.author}</p>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.description}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <FaHeart className="text-red-500" />
                    <span className="text-sm text-gray-600">{post.likes}</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags?.map((tag, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPosts;
