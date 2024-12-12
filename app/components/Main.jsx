"use client"
import React, { useState, useEffect } from "react";
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import { FaCode, FaLaptopCode, FaPalette, FaBrain, FaBookOpen, FaCamera } from "react-icons/fa";
import Categories from "./Categories";
import FeaturedPosts from "./FeaturedPosts";
import RecentPosts from "./RecentPosts";

const BlogHomepage = () => {

  

 

 

  return (
    <div className="min-h-screen    overflow-x-hidden">
     

      {/* Categories */}
     <Categories/>

      {/* Featured Posts */}
     <FeaturedPosts/>

      {/* Recent Posts and Tags */}
      <RecentPosts/>
    </div>
  );
};

export default BlogHomepage;