"use client";
import React, { useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";

const BlogPostsTable = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "Getting Started with React and Tailwind",
      status: "Published",
      createdAt: "2024-01-15",
    },
    {
      id: 2,
      title: "Best Practices in Modern Web Development",
      status: "Draft",
      createdAt: "2024-01-14",
    },
    {
      id: 3,
      title: "Understanding JavaScript Promises",
      status: "Published",
      createdAt: "2024-01-13",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    status: "Draft",
  });

  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPost = {
      id: posts.length + 1,
      ...formData,
      createdAt: new Date().toISOString().split("T")[0],
    };
    setPosts([...posts, newPost]);
    setShowModal(false);
    setFormData({ title: "", content: "", status: "Draft" });
  };

  const handleDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
  };

  const Modal = () => (
    <div className="fixed inset-0 z-50 flex items-center justify-center  bg-opacity-50">
      <div className="w-full max-w-md rounded-lg  p-6 shadow-xl">
        <h2 className="mb-4 text-2xl font-bold">Add New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block font-bold" htmlFor="title">
              Title
            </label>
            <input
              type="text"
              id="title"
              className="w-full rounded border p-2"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              className="w-full rounded border p-2"
              rows="4"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              required
            />
          </div>
          <div className="mb-4">
            <label className="mb-2 block font-bold" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              className="w-full rounded border p-2"
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value })
              }
            >
              <option value="Draft">Draft</option>
              <option value="Published">Published</option>
            </select>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="rounded bg-gray-300 px-4 py-2 font-bold text-gray-700 hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          <FiPlus className="mr-2" /> Add New Post
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="border  ">
            <tr>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Title
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Status
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Created At
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 ">
            {currentPosts.map((post) => (
              <tr key={post.id} className=" hover:bg-cyan-800">
                <td className="px-6 py-4">{post.title}</td>
                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      post.status === "Published"
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-6 py-4">{post.createdAt}</td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button className="rounded p-1 text-blue-600 hover:bg-blue-100">
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="rounded p-1 text-red-600 hover:bg-red-100"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-gray-600">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded bg-gray-200 px-4 py-2 font-bold text-gray-700 hover:bg-gray-300 disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {showModal && <Modal />}
    </div>
  );
};

export default BlogPostsTable;
