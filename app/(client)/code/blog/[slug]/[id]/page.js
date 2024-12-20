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

const BlogPost = ({ params }) => {
  const { id } = params;
  console.log("Blog ID:", id);
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.post("/api/blog/oneread", { id });
        const fetchedPost = response.data.data;
        setPost(fetchedPost);
        console.log("Fetched Blog Post:", fetchedPost);
      } catch (error) {
        console.error("Error fetching blog post:", error);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-4 py-8">
        <div className="space-y-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
            <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
              {post.tags.length > 0 ? post.tags[0] : "No Category"}
            </span>
          </div>
          <h1 className="  text-4xl md:text-5xl font-bold text-gray-900 dark:text-white transition-all duration-300">
            {post.title}
          </h1>
          <LikeButton blogId={post._id} />

          <div className="flex items-center space-x-4">
            <img
              src={post.author.image}
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
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        <img
          src={post.image}
          alt="Blog Cover"
          className="w-full h-96 object-cover rounded-xl mb-8 transition-transform duration-300 hover:scale-[1.02]"
        />

        {/* <article className="prose lg:prose-xl max-w-none text-gray-900 dark:text-white">
          <p>{post.content}</p>
        </article> */}

        <article
          className="prose lg:prose-xl max-w-none text-gray-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></article>

        {/* Comments Section */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Comments ({post.comments.length})
          </h2>

          {/* Comment Form */}
          <form className="mb-8 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
              />
            </div>
            <textarea
              placeholder="Your comment"
              rows="4"
              className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-400 outline-none"
            ></textarea>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition-colors">
              Post Comment
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-6">
            {post.comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white p-6 rounded-xl shadow-sm dark:bg-gray-800 dark:text-white"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <img
                    src={comment.avatar}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full"
                  />
                  <div>
                    <p className="font-medium">{comment.author}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {comment.date}
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">
                  {comment.content}
                </p>
              </div>
            ))}
          </div>
        </section>
        {/* Related Posts */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {post.comments.map((relatedPost) => (
              <div key={relatedPost.id} className="group cursor-pointer">
                <div className="relative overflow-hidden rounded-xl">
                  <img
                    src={relatedPost.image}
                    alt={relatedPost.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {relatedPost.title}
                </h3>
              </div>
            ))}
          </div>
        </section>

        {/* Author Bio */}
        <section className="mt-12 bg-white p-6 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
          <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
            About the Author
          </h3>
          <div className="flex items-center space-x-4">
            <img
              src={post.image}
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
        {/* Pagination */}
        <div className="flex justify-between items-center mt-12">
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
            <FaChevronLeft />
            <span>Previous</span>
          </button>
          <button className="flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500">
            <span>Next</span>
            <FaChevronRight />
          </button>
        </div>
      </main>
    </div>
  );
};

export default BlogPost;