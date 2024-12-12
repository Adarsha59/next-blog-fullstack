"use client"
import React, { useState } from 'react';
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import { FaCode, FaLaptopCode, FaPalette, FaBrain, FaBookOpen, FaCamera } from "react-icons/fa";
const Categories = () => {
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
    
  return (
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
  );
}

export default Categories;
