"use client";
import axios from "axios";
import React, { useState } from "react";
const AddBlogPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    tags: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to an array
    };
    console.log(dataToSubmit); // Send this data to your backend API
    // API call logic here (e.g., using fetch or axios)
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        Add Blog Post
      </h1>
      <form onSubmit={handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm bg-transparent text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm bg-transparent text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Content */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Content
          </label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            required
            rows="5"
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm bg-transparent text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          ></textarea>
        </div>

        {/* Author */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Author
          </label>
          <input
            type="text"
            name="author"
            value={formData.author}
            onChange={handleChange}
            required
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm bg-transparent text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm bg-transparent text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Image */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Image URL
          </label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 dark:border-gray-600 shadow-sm bg-transparent text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPost;
