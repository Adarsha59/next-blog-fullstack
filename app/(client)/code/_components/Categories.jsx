"use client";
import React, { useState } from "react";
import { FiMessageCircle } from "react-icons/fi";
import {
  FaCode,
  FaLaptopCode,
  FaPalette,
  FaBrain,
  FaBookOpen,
  FaCamera,
  FaMusic,
  FaGlobe,
  FaGamepad,
  FaFilm,
} from "react-icons/fa";
import Link from "next/link";

const Categories = ({ posts }) => {
  console.log("categories", posts);

  // Extract unique tags from posts
  const uniqueTags = [...new Set(posts.flatMap((post) => post.tags))];

  // Centralized mapping of keywords to icons
  const categoryIcons = {
    Programming: FaCode,
    Technology: FaLaptopCode,
    Design: FaPalette,
    AI: FaBrain,
    ML: FaBrain,
    Education: FaBookOpen,
    Photography: FaCamera,
    Music: FaMusic,
    Travel: FaGlobe,
    Gaming: FaGamepad,
    Film: FaFilm,
  };

  // Function to dynamically get the icon for a tag
  const getIconForTag = (tag) => {
    for (const [key, Icon] of Object.entries(categoryIcons)) {
      if (tag.toLowerCase().includes(key.toLowerCase())) {
        return Icon;
      }
    }
    return FiMessageCircle; // Default icon
  };

  const [selectedCategory, setSelectedCategory] = useState(null);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Categories
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {uniqueTags.map((tag, index) => {
          const Icon = getIconForTag(tag);
          return (
            <Link
              href="/code/allblog"
              key={index}
              onClick={() => setSelectedCategory(tag)}
              className={`p-6 rounded-xl border dark:border-white/10 border-black/10 
              dark:hover:border-white/30 hover:border-white/30 transition-all duration-300
              hover:scale-105 hover:shadow-lg hover:shadow-purple-500/20 group ${
                selectedCategory === tag
                  ? "bg-purple-100 dark:bg-purple-800"
                  : ""
              }`}
            >
              <Icon className="w-8 h-8 mx-auto mb-4 text-purple-400 group-hover:text-purple-300 transition-colors duration-300" />
              <p className="text-center text-sm font-medium">{tag}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Categories;
