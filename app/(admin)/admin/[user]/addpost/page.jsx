"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import JoditEditor from "jodit-react";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";

const AddPost = () => {
  const { user } = useUser();
  const router = useRouter();
  console.log("user", user);
  const editor = useRef(null);
  const searchParams = useSearchParams();
  const postId = searchParams.get("id"); // Fetch postId from query params
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    author: user.fullName,
    author_image: user.imageUrl,
    tags: "",
    image: "",
    status: "published", // Default to "draft"
  });

  const [errors, setErrors] = useState({});
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        try {
          const response = await axios.post("/api/blog/oneread", {
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
            status: post.status || "published", // Default to draft if not provided
          });
        } catch (error) {
          console.error("Error fetching post:", error);
        }
      }
    };
    fetchPost();
  }, [postId]);

  const config = useMemo(
    () => ({
      readonly: false, // Editor is editable
      placeholder: "Start typing...",
      height: "450px",
      width: "100%",
      enableDragAndDropFileToEditor: false,
      // buttons: [
      //   "source",
      //   "|",
      //   "bold",
      //   "italic",
      //   "underline",
      //   "|",
      //   "ul",
      //   "ol",
      //   "|",
      //   "font",
      //   "fontsize",
      //   "brush",
      //   "paragraph",
      //   "|",
      //   "image",
      //   "table",
      //   "link",
      //   "|",
      //   "left",
      //   "center",
      //   "right",
      //   "justify",
      //   "|",
      //   "undo",
      //   "redo",
      //   "|",
      //   "hr",
      //   "eraser",
      //   "fullsize",
      // ],
      // uploader: { insertImageAsBase64URI: true },
      // removeButtons: ["brush", "file"],
      showXPathInStatusbar: true,
      showCharsCounter: true,
      showWordsCounter: true,
      toolbarAdaptive: true,
      toolbarSticky: true,
      style: {
        background: "#B17261", // Gradient background
        color: "black",
        backdropFilter: "blur(10px)", // Slightly brighter text color
        borderRadius: "8px", // Smooth rounded corners
        padding: "10px 15px", // Comfortable padding
        transition: "all 0.3s ease", // Smooth hover transitions
      },

      // theme: "dark",
    }),
    []
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEditorChange = (content) => {
    setFormData((prev) => ({
      ...prev,
      content,
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
        await axios.put(`/api/blog/${postId}/edit`, dataToSubmit); // Update existing post
        toast.success("Post Updated Success");
      } else {
        await axios.post("/api/blog/create", dataToSubmit); // Create new post
        toast.success("Post Created Success");
      }
      handleReset();
      router.push(`/admin/${user.firstName}/dashboard`);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Can't submit form", error);
    }
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      content: "",
      tags: "",
      image: "",
      status: "published",
    });
    setErrors({});
  };
  return (
    <div className="min-h-screen bg-gradient-to-br p-6">
      <div className="max-w-7xl mx-auto">
        <nav className="sticky top-0 backdrop-blur-lg rounded-lg p-4 mb-6 shadow-sm">
          {!postId ? (
            <h1 className="text-2xl font-bold ">Create New Post</h1>
          ) : (
            <h1 className="text-2xl font-bold ">Edit Post</h1>
          )}
        </nav>

        <div className="grid  gap-6">
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
                  onChange={handleChange}
                  placeholder="Enter your post title here..."
                  className="w-full bg-transparent px-4 py-3 text-xl font-bold border rounded-lg"
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
                  onChange={handleChange}
                  placeholder="Enter a short description..."
                  className="w-full bg-transparent px-4 py-3 text-lg border rounded-lg"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Author Input */}
              {/* <div>
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
                  onChange={handleChange}
                  placeholder="Enter the author's name..."
                  className={`w-full bg-transparent px-4 py-3 text-xl font-bold border rounded-lg`}
                />
                {errors.author && (
                  <p className="text-red-500 text-sm mt-1">{errors.author}</p>
                )}
              </div> */}

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
                  ref={editor}
                  value={formData.content}
                  config={config}
                  onBlur={handleEditorChange}
                />
                {errors.content && (
                  <p className="text-red-500 text-sm mt-1">{errors.content}</p>
                )}
              </div>

              {/* authir Image Link Input */}
              {/* <div>
                <label
                  htmlFor="image"
                  className="text-lg font-semibold text-gray-700"
                >
                  Author Image URL
                </label>
                <input
                  type="text"
                  id="author_image"
                  name="author_image"
                  value={formData.author_image}
                  onChange={handleChange}
                  placeholder="Image URL (optional)"
                  className={`w-full bg-transparent px-4 py-3 text-lg font-bold border rounded-lg`}
                />
              </div> */}
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
                  placeholder="Thumbnail Image URL "
                  className={`w-full bg-transparent px-4 py-3 text-lg font-bold border rounded-lg`}
                />
              </div>

              {/* Status Dropdown */}
              <div>
                <label
                  htmlFor="status"
                  className="text-lg  font-semibold text-gray-700"
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
                  <option className="bg-transparent" value="published">
                    Published
                  </option>
                  <option className="bg-transparent" value="draft ">
                    Draft
                  </option>
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
