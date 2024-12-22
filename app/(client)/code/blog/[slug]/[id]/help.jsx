// "use client";

// import axios from "axios";
// import { useParams } from "next/navigation";
// import React, { useState, useEffect } from "react";
// import {
//   FaFacebook,
//   FaTwitter,
//   FaLinkedin,
//   FaClock,
//   FaChevronLeft,
//   FaChevronRight,
// } from "react-icons/fa";
// import LikeButton from "../../../_components/Like";
// import FeaturedPosts from "../../../_components/FeaturedPosts";
// import toast from "react-hot-toast";
// import Image from "next/image";

// const BlogPost = ({ params }) => {
//   const { id } = params; // Extract id from dynamic route
//   const [post, setPost] = useState(null);
//   const [topLikedPosts, setTopLikedPosts] = useState([]);
//   const [formData, setFormData] = useState({
//     user: "",
//     email: "",
//     comment: "",
//   });

//   const formatDate = (dateString) => new Date(dateString).toUTCString();

//   // Fetch top liked posts for the sidebar
//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("/api/blog/read");
//         const posts = response.data.data.filter(
//           (post) => post.status === "published"
//         );
//         const topLiked = posts.sort((a, b) => b.likes - a.likes).slice(0, 4);
//         setTopLikedPosts(topLiked);
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//       }
//     };
//     fetchPosts();
//   }, []);

//   // Fetch specific blog post data
//   useEffect(() => {
//     const fetchPost = async () => {
//       try {
//         const response = await axios.post("/api/blog/oneread", { id });
//         setPost(response.data.data);
//       } catch (error) {
//         console.error("Error fetching blog post:", error);
//       }
//     };

//     if (id) fetchPost();
//   }, [id]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     const commentData = { ...formData, blogId: id };

//     try {
//       await axios.post("/api/comment/create", commentData);
//       toast.success("Comment submitted successfully");
//       setFormData({ user: "", email: "", comment: "" });
//     } catch (error) {
//       toast.error("Failed to submit comment");
//     }
//   };

//   if (!post) return <div>Loading...</div>;

//   return (
//     <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
//       {/* Header */}
//       <header className="max-w-4xl mx-auto px-4 py-8">
//         <div className="space-y-4">
//           <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
//             <span className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100 px-3 py-1 rounded-full">
//               {post.tags?.[0] || "No Category"}
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white">
//             {post.title}
//           </h1>
//           <div className="flex items-center space-x-4">
//             <Image
//               src={post.author_image}
//               width={48}
//               height={48}
//               alt={post.author}
//               className="w-12 h-12 rounded-full"
//             />
//             <div>
//               <p className="font-medium text-gray-900 dark:text-white">
//                 {post.author}
//               </p>
//               <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
//                 <FaClock className="mr-2" />
//                 {formatDate(post.createdAt)}
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-4xl mx-auto px-4 py-8">
//         <LikeButton blogId={post._id} />
//         <img
//           src={post.image}
//           alt="Blog Cover"
//           className="w-full h-96 object-cover rounded-xl mb-8 transition-transform duration-300 hover:scale-105"
//         />
//         <article
//           className="prose lg:prose-xl text-gray-900 dark:text-white"
//           dangerouslySetInnerHTML={{ __html: post.content }}
//         ></article>

//         {/* Comments Section */}
//         <section className="mt-12">
//           <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
//             Comments ({post.comments?.length || 0})
//           </h2>
//           <form onSubmit={handleCommentSubmit} className="mb-8 space-y-4">
//             <div className="grid grid-cols-2 gap-4">
//               <input
//                 type="text"
//                 name="user"
//                 value={formData.user}
//                 onChange={handleInputChange}
//                 placeholder="Name"
//                 className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleInputChange}
//                 placeholder="Email"
//                 className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//               />
//             </div>
//             <textarea
//               name="comment"
//               value={formData.comment}
//               onChange={handleInputChange}
//               placeholder="Your comment"
//               rows="4"
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
//             ></textarea>
//             <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
//               Post Comment
//             </button>
//           </form>

//           <div className="space-y-6">
//             {post.comments?.map((comment) => (
//               <div key={comment._id} className="p-6 border rounded-lg">
//                 <p className="font-semibold">{comment.user}</p>
//                 <p className="text-sm">{formatDate(comment.commentedAt)}</p>
//                 <p>{comment.comment}</p>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* Related Posts */}
//         <section className="mt-12">
//           <FeaturedPosts posts={topLikedPosts} title="Related Posts" />
//         </section>
//       </main>
//     </div>
//   );
// };

// export default BlogPost;
