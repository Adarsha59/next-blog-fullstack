"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import JoditEditor from "jodit-react";

const AddPost = () => {
  const editor = useRef(null);
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
    status: "draft", // Default to "draft"
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
        status: "draft", // Reset status to "draft"
      });
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(true);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      author: "",
      tags: "",
      image: "",
      status: "draft", // Reset status to "draft"
    });
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="sticky top-0 backdrop-blur-lg rounded-lg p-4 mb-6 shadow-sm">
          {!postId ? (
            <h1 className="text-2xl font-bold text-gray-800">
              Create New Post
            </h1>
          ) : (
            <h1 className="text-2xl font-bold text-gray-800">Edit Post</h1>
          )}
        </nav>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Form Section */}
          <div className="dark:bg-zinc-950 rounded-xl p-6 shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title Input */}
              <div>
                <label
                  htmlFor="title"
                  className="text-lg font-semibold text-gray-700"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter your post title here..."
                  className={`w-full bg-transparent px-4 py-3 text-xl font-bold border rounded-lg`}
                />
                {errors.title && (
                  <p className="text-red-500 text-sm mt-1">{errors.title}</p>
                )}
              </div>

              {/* Description Input */}
              <div>
                <label
                  htmlFor="description"
                  className="text-lg font-semibold text-gray-700"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter a short description of the blog..."
                  className={`w-full bg-transparent px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
                    errors.description ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Author Input */}
              <div>
                <label
                  htmlFor="author"
                  className="text-lg font-semibold text-gray-700"
                >
                  Author
                </label>
                <input
                  type="text"
                  id="author"
                  name="author"
                  value={formData.author}
                  onChange={handleInputChange}
                  placeholder="Enter the author's name..."
                  className={`w-full bg-transparent px-4 py-3 text-xl font-bold border rounded-lg`}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                )}
              </div>

              {/* Tags Selector */}
              <div>
                <label
                  htmlFor="tags"
                  className="text-lg font-semibold text-gray-700"
                >
                  Tags
                </label>
                <input
                  type="text"
                  id="tags"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  placeholder="Enter tags, separated by commas"
                  className={`w-full bg-transparent px-4 py-3 text-lg border rounded-lg focus:ring-2 focus:ring-purple-500 outline-none ${
                    errors.tags ? "border-red-500" : "border-gray-200"
                  }`}
                />
                {errors.tags && (
                  <p className="text-red-500 text-sm mt-1">{errors.tags}</p>
                )}
              </div>

              {/* Content Input */}
              <div>
                <label
                  htmlFor="content"
                  className="text-lg font-semibold text-gray-700"
                >
                  Content
                </label>
                <JoditEditor
                  id="content"
                  ref={editor}
                  name="content"
                  value={formData.content}
                  onChange={(newContent) =>
                    setFormData((prev) => ({ ...prev, content: newContent }))
                  }
                  placeholder="Enter the full content..."
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </div>

              {/* Image Link Input */}
              <div>
                <label
                  htmlFor="image"
                  className="text-lg font-semibold text-gray-700"
                >
                  Image URL
                </label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  placeholder="Image URL (optional)"
                  className={`w-full bg-transparent px-4 py-3 text-lg font-bold border rounded-lg`}
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <label
                  htmlFor="status"
                  className="text-lg font-semibold text-gray-700"
                >
                  Status
                </label>
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full bg-transparent px-4 py-3 text-lg font-bold border rounded-lg"
                >
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </div>

              {/* Submit and Reset Buttons */}
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-200"
                >
                  {postId ? "Update Post" : "Create Post"}
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-6 py-2 text-white bg-gray-500 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPost;
