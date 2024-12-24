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
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const published = response.data.data;
        const posts = published.filter((post) => post.status === "published"); // Filter posts with 'published' status
        // Sort posts by likes in descending order and get the top 4
        const sortedPostsByLikes = [...posts].sort((a, b) => b.likes - a.likes);
        const topLiked = sortedPostsByLikes.slice(0, 4);

        // Sort posts by updatedAt in descending order (latest posts first)
        const sortedPostsByUpdatedAt = [...posts].sort((a, b) => {
          // Convert updatedAt strings to Date objects for comparison
          const updatedAtA = new Date(a.updatedAt);
          const updatedAtB = new Date(b.updatedAt);
          return updatedAtB - updatedAtA; // descending order
        });
        const recent = sortedPostsByUpdatedAt.slice(0, 5);
        const tag = sortedPostsByUpdatedAt.slice(0, 6);

        setPosts(tag);
        setTopLikedPosts(topLiked);
        setRecentPosts(recent);

        console.log("All posts:", posts);
        console.log("Top 4 most liked posts:", topLiked);
        console.log("Top 5 recent posts:", recent);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Categories */}
      <Categories posts={posts} />

      {/* Featured Posts (Top 4 most liked) */}
      <FeaturedPosts posts={topLikedPosts} />

      {/* Recent Posts (Top 3 most recent by updatedAt descending) */}
      <RecentPosts posts={recentPosts} />
    </div>
  );
};

export default BlogHomepage;
