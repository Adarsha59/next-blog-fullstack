"use client";
import React, { useState, useEffect } from "react";
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import {
  FaCode,
  FaLaptopCode,
  FaPalette,
  FaBrain,
  FaBookOpen,
  FaCamera,
} from "react-icons/fa";
import Categories from "./Categories";
import FeaturedPosts from "./FeaturedPosts";
import RecentPosts from "./RecentPosts";
import axios from "axios";
const BlogHomepage = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const posts = response.data.data;
        setPosts(posts);
        console.log("object returned", response.data.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen    overflow-x-hidden">
      {/* Categories */}
      <Categories />

      {/* Featured Posts */}
      <FeaturedPosts posts={posts} />

      {/* Recent Posts and Tags */}
      <RecentPosts posts={posts} />
    </div>
  );
};

export default BlogHomepage;
