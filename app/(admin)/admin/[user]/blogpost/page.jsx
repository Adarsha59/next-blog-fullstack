"use client";
import React, { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus } from "react-icons/fi";
import { useRouter } from "next/navigation";
import axios from "axios";
import { format } from "date-fns";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
const BlogPostsTable = () => {
  const { user } = useUser();
  const router = useRouter();
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "loading",
      status: "loading",
      createdAt: "2024-01-15",
    },
  ]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const fetchedPosts = response.data.data;

        // Filter posts authored by the current user
        const userPosts = fetchedPosts.filter(
          (post) => post.author === user.fullName
        );

        setPosts(userPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Only fetch posts if the user object is available
    if (user) {
      fetchPosts();
    }
  }, [user]);

  const gopost = () => {
    router.push(`/admin/${user.firstName}/addpost`);
  };
  const goedit = (id) => {
    router.push(`/admin/${user.firstName}/addpost?id=${id}`);
  };
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to your API with the ID in the URL
      const response = await axios.delete(`/api/blog/${id}/delete`);

      // Success message from the backend
      toast.success("Post deleted successfully");
      // Optionally, refresh the posts or handle success
      setPosts(posts.filter((post) => post._id !== id)); // Remove the deleted post from the local state
    } catch (error) {
      toast.error("Error deleting post:", error);
      // Optionally show an alert or toast
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(posts.length / postsPerPage);

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Blog Posts</h1>
        <button
          onClick={gopost}
          className="flex items-center rounded-full bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-600"
        >
          <FiPlus className="mr-2" /> Add New Post
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full table-auto">
          <thead className="border">
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
                Updated At
              </th>
              <th className="px-6 py-3 text-left font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentPosts.map((post) => (
              <tr key={post.id} className="hover:bg-cyan-800">
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
                <td className="px-6 py-4">
                  {post.createdAt
                    ? format(new Date(post.createdAt), "yyyy-MM-dd")
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  {post.updatedAt
                    ? format(new Date(post.updatedAt), "yyyy-MM-dd")
                    : "N/A"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => goedit(post._id)}
                      className="rounded p-1 text-blue-600 hover:bg-blue-100"
                    >
                      <FiEdit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(post._id)}
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
    </div>
  );
};

export default BlogPostsTable;
