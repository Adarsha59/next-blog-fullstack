"use client";
import axios from "axios";
import { useParams } from "next/navigation";
import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaClock,
  FaUser,
  FaTags,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import LikeButton from "../../../_components/Like";
import FeaturedPosts from "../../../_components/FeaturedPosts";
import toast from "react-hot-toast";
import Image from "next/image";

const BlogPost = ({ params }) => {
  const { id } = params || {};

  console.log("id", id);
  if (!id) {
    return <div>Loading...</div>;
  }
  const [post, setPost] = useState(null);
  const [topLikedPosts, setTopLikedPosts] = useState([]);
  const [formData, setFormData] = useState({
    user: "",
    email: "",
    comment: "",
  });

  // Fetching the top liked posts for the sidebar
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const published = response.data.data;
        const posts = published.filter((post) => post.status === "published");
        const sortedPostsByLikes = [...posts].sort((a, b) => b.likes - a.likes);
        const topLiked = sortedPostsByLikes.slice(0, 4);

        setTopLikedPosts(topLiked);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);

  // Fetching the specific blog post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post("/api/blog/oneread", { id });
        const fetchedPost = response.data.data;
        console.log("object fetched:", fetchedPost);
        setPost(fetchedPost);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    const finalComment = {
      ...formData,
      blogId: id, // Directly add blogId using `id` from params
    };
    console.log("hi", finalComment);

    try {
      const response = await axios.post("/api/comment/create", finalComment);
      toast.success("Comment submitted successfully");
      setFormData({
        user: "",
        email: "",
        comment: "",
      });
      // Optionally reset formData or show a success message
    } catch (error) {
      // Show an error message using a library like react-toast
      toast.error("Can't submit comment");
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
              {post.tags.length > 0 ? post.tags[0] : "No Category"}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-all duration-300">
            {post.title}
          </h1>
          <div className="flex items-center space-x-4">
            <img
              src={post.author_image}
              alt={post.author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {post.author}
              </p>
              <div className="flex items-center text-gray-600 dark:text-gray-400 text-sm">
                <FaClock className="mr-2" />
                {new Date(post.createdAt).toLocaleDateString()}
              </div>
            </div>
          </div>

          <div className="flex space-x-4">
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
              <FaFacebook className="text-blue-600 dark:text-blue-400" />
            </button>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
              <FaTwitter className="text-blue-400 dark:text-blue-300" />
            </button>
            <button className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 dark:bg-blue-800 dark:hover:bg-blue-700 transition-colors">
              <FaLinkedin className="text-blue-700 dark:text-blue-500" />
            </button>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <LikeButton blogId={post._id} />
        <img
          src={post.image}
          alt="Blog Cover"
          className="w-full h-96 object-cover rounded-xl mb-8 transition-transform duration-300 hover:scale-[1.02]"
        />
        <article
          className="prose lg:prose-xl max-w-none text-gray-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>
        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Comments ({post.comments.length})
          </h2>
          <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="user"
                value={formData.user}
                onChange={handleInputChange}
                placeholder="Name"
                className="p-3 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className="p-3 bg-transparent rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <textarea
              name="comment"
              value={formData.comment}
              onChange={handleInputChange}
              placeholder="Your comment"
              rows="4"
              className="w-full p-3 rounded-lg bg-transparent border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors">
              Post Comment
            </button>
          </form>

          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 dark:bg-gray-800 dark:text-white"
              >
                <div className="flex items-center space-x-4 mb-4">
                  {/* Avatar - First letter of user's name */}
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center text-xl font-bold">
                    {comment.user[0].toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <p className="font-semibold text-lg text-gray-900 dark:text-gray-100">
                      {comment.user}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(comment.commentedAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Comment Content */}
                <p className="text-gray-800 dark:text-gray-300 text-base leading-relaxed">
                  {comment.comment}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Related Posts */}
        <section className="mt-12">
          <FeaturedPosts posts={topLikedPosts} title="Related Posts" />
        </section>
        {/* Author Bio */}
        <section className="mt-12 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            About the Author
          </h3>
          <div className="flex items-center space-x-4">
            <img
              src={post.author_image}
              alt={post.author}
              className="w-16 h-16 rounded-full"
            />
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                {post.author}
              </p>
              <p className="text-gray-700 dark:text-gray-300">
                {post.author.bio}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BlogPost;
