"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddBlogPost = () => {
  const searchParams = useSearchParams();
  const postId = searchParams.get("id"); // Fetch postId from query params
  console.log("Search", postId);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: "",
    tags: "",
    image: "",
    status: "", // Default to "draft"
  });

  // Fetch post data if editing
  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await axios.post(`/api/blog/oneread`, {
            id: postId,
          });

          const post = response.data.data; // Assuming API returns post data under 'data'
          setFormData({
            title: post.title || "",
            description: post.description || "",
            content: post.content || "",
            author: post.author || "",
            tags: post.tags ? post.tags.join(", ") : "", // Convert tags array to string
            image: post.image || "",
            status: post.status || "draft", // Set status from fetched post (default to "draft")
          });
          console.log("Fetched Post Data:", post);
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };
    fetchPost();
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const dataToSubmit = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()), // Convert tags to array
    };

    try {
      if (postId) {
        // Update existing post
        await axios.put(`/api/blog/${postId}/edit`, dataToSubmit);
        console.log("Post Updated:", dataToSubmit);
      } else {
        // Create new post
        await axios.post("/api/blog/create", dataToSubmit);
        console.log("Post Created:", dataToSubmit);
      }
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        content: "",
        author: "",
        tags: "",
        image: "",
        status: "", // Reset status to "draft"
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-transparent border border-gray-300 dark:border-gray-600 rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        {postId ? "Edit Blog Post" : "Add Blog Post"}
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

        {/* Status */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Status
          </label>
          <div className="flex items-center space-x-4 mt-2">
            <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="status"
                value="draft"
                checked={formData.status === "draft"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-indigo-500"
              />
              <span className="ml-2">Draft</span>
            </label>
            <label className="inline-flex items-center text-gray-700 dark:text-gray-300">
              <input
                type="radio"
                name="status"
                value="published"
                checked={formData.status === "published"}
                onChange={handleChange}
                className="form-radio h-4 w-4 text-indigo-500"
              />
              <span className="ml-2">Published</span>
            </label>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full border border-gray-300 dark:border-gray-600 bg-transparent text-gray-900 dark:text-gray-100 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {postId ? "Update Post" : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBlogPost;
