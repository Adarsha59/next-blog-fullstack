"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import { FaCode, FaLaptopCode, FaPalette, FaBrain, FaBookOpen, FaCamera } from "react-icons/fa";

const BlogHomepage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { id: 1, name: "Programming", icon: FaCode },
    { id: 2, name: "Technology", icon: FaLaptopCode },
    { id: 3, name: "Design", icon: FaPalette },
    { id: 4, name: "AI & ML", icon: FaBrain },
    { id: 5, name: "Education", icon: FaBookOpen },
    { id: 7, name: "Photography", icon: FaCamera },
    { id: 8, name: "Photography", icon: FaCamera },
    { id: 9, name: "Photography", icon: FaCamera },
    { id: 10, name: "Photography", icon: FaCamera }
  ];

  const featuredPosts = [
    {
      id: 1,
      title: "The Future of Web Development",
      excerpt: "Exploring the latest trends in web development and what's coming next.",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
      readTime: 5,
      comments: 12
    },
    {
      id: 2,
      title: "Mastering React Hooks",
      excerpt: "A comprehensive guide to using React Hooks effectively in your projects.",
      image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
      readTime: 8,
      comments: 24
    },
    {
      id: 3,
      title: "UI Design Trends 2024",
      excerpt: "Discover the latest UI design trends that are shaping the digital world.",
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
      readTime: 6,
      comments: 18
    },
    {
      id: 4,
      title: "AI in Modern Applications",
      excerpt: "How artificial intelligence is revolutionizing software development.",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
      readTime: 7,
      comments: 15
    },
    {
      id: 5,
      title: "The Art of Clean Code",
      excerpt: "Best practices for writing maintainable and efficient code.",
      image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
      readTime: 10,
      comments: 30
    }
  ];

  const recentPosts = [
    {
      id: 1,
      title: "Getting Started with TailwindCSS",
      excerpt: "Learn how to set up and use TailwindCSS in your projects.",
      date: "2024-01-15",
      readTime: 4,
      comments: 8,
      tags: ["CSS", "Frontend", "Web Development"]
    },
    {
      id: 2,
      title: "JavaScript Performance Tips",
      excerpt: "Optimize your JavaScript code for better performance.",
      date: "2024-01-14",
      readTime: 6,
      comments: 15,
      tags: ["JavaScript", "Performance", "Programming"]
    },
    {
      id: 3,
      title: "Building Responsive Layouts",
      excerpt: "Create responsive web layouts that work across all devices.",
      date: "2024-01-13",
      readTime: 5,
      comments: 10,
      tags: ["CSS", "Responsive Design", "Web Development"]
    }
  ];

  const popularTags = [
    "React", "JavaScript", "Web Development", "UI/UX", "Programming",
    "CSS", "Technology", "Design", "Frontend", "Backend"
  ];

  return (
    <div className="min-h-screen    overflow-x-hidden">
      {/* Search Bar */}
      <div className="sticky top-0 z-50 backdrop-blur-md bg-opacity-30  p-4">
        <div className="max-w-6xl mx-auto flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full px-6 py-3 rounded-full  border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 outline-none backdrop-blur-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute right-6 top-1/2 transform -translate-y-1/2 " />
          </div>
        </div>
      </div>

      {/* Categories */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className="p-6 rounded-xl  border dark:border-white/10 border-black/10  dark:hover:border-white/30 hover:border-white/30 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group"
            >
              <category.icon className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              <p className="text-center text-sm font-medium">{category.name}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Posts */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Featured Posts</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
          {featuredPosts.map((post) => (
            <div
              key={post.id}
              className="min-w-[300px] max-w-[300px] rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 overflow-hidden dark:hover:border-white/30 hover:border-white/30 transition-all duration-300 hover:scale-105 snap-start"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="dark:text-white/70 text-black/70 text-sm mb-4">{post.excerpt}</p>
                <div className="flex items-center text-sm dark:text-white/50 text-black/50">
                  <FiClock className="mr-2" />
                  <span className="mr-4">{post.readTime} min read</span>
                  <FiMessageCircle className="mr-2" />
                  <span>{post.comments} comments</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts and Tags */}
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Recent Posts</h2>
          <div className="space-y-6">
            {recentPosts.map((post) => (
              <div
                key={post.id}
                className="p-6 rounded-xl bg-white/5 border dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-white/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="dark:text-white/70 text-black/70  mb-4">{post.excerpt}</p>
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
                  <span className="mr-4">{post.date}</span>
                  <FiClock className="mr-2" />
                  <span className="mr-4">{post.readTime} min read</span>
                  <FiMessageCircle className="mr-2" />
                  <span>{post.comments} comments</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {popularTags.map((tag, index) => (
              <button
                key={index}
                className="px-4 py-2 rounded-full bg-white/5 border dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-white/30 transition-all duration-300 hover:scale-105"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Subscribe Section */}
          <div className="mt-12 p-6 rounded-xl bg-white/5 border dark:border-white/10 border-black/10">
            <h3 className="text-2xl font-bold mb-4">Subscribe to Newsletter</h3>
            <p className="text-white/70 mb-6">Get the latest posts delivered right to your inbox.</p>
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
    </div>
  );
};

export default BlogHomepage;