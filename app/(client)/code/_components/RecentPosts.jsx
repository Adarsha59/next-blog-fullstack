import React from 'react';
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";
import PopularTags from './PopularTags';
import Link from 'next/link';
const RecentPosts = () => {
    const slugify = (text) => {
        return text
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-') // Replace non-alphanumeric characters with hyphens
          .replace(/(^-|-$)/g, ''); // Remove hyphens at the beginning or end of the string
      };
    const recentPosts = [
        {
          id: 1,
          title: "Getting Started with TailwindCSS",
          excerpt: "Learn how to set up and use TailwindCSS in your projects.",
          date: "2024-01-15",
          readTime: 4,
          comments: 8,
          tags: ["CSS", "Frontend", "Web Development"]
        },
        {
          id: 2,
          title: "JavaScript Performance Tips",
          excerpt: "Optimize your JavaScript code for better performance.",
          date: "2024-01-14",
          readTime: 6,
          comments: 15,
          tags: ["JavaScript", "Performance", "Programming"]
        },
        {
          id: 3,
          title: "Building Responsive Layouts",
          excerpt: "Create responsive web layouts that work across all devices.",
          date: "2024-01-13",
          readTime: 5,
          comments: 10,
          tags: ["CSS", "Responsive Design", "Web Development"]
        }
      ];
    
      const popularTags = [
        "React", "JavaScript", "Web Development", "UI/UX", "Programming",
        "CSS", "Technology", "Design", "Frontend", "Backend"
      ];
  return (
    <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2">
      <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Recent Posts</h2>
      <div className="space-y-6">
        {recentPosts.map((post) => (
          <div
            key={post.id}
            className="p-6 rounded-xl bg-white/5 border dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-white/30 transition-all duration-300"
          >
             <Link key={post.id} href={`/blog/${slugify(post.title)}`}>
          <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
        </Link>
            {/* <h3 className="text-xl font-semibold mb-2">{post.title}</h3> */}
            <p className="dark:text-white/70 text-black/70  mb-4">{post.excerpt}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-300 text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex items-center text-sm dark:text-white/50 text-red/50">
              <span className="mr-4">{post.date}</span>
              <FiClock className="mr-2" />
              <span className="mr-4">{post.readTime} min read</span>
              <FiMessageCircle className="mr-2" />
              <span>{post.comments} comments</span>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div>
      <PopularTags/>

      {/* Subscribe Section */}
      <div className="mt-12 p-6 rounded-xl bg-white/5 border dark:border-white/10 border-black/10">
        <h3 className="text-2xl font-bold mb-4">Subscribe to Newsletter</h3>
        <p className="text-white/70 mb-6">Get the latest posts delivered right to your inbox.</p>
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-white/50 focus:ring-2 focus:ring-white/20 transition-all duration-300 outline-none mb-4"
        />
        <button className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 transition-all duration-300 font-medium hover:scale-105">
          Subscribe
        </button>
      </div>
    </div>
  </div>
  );
}

export default RecentPosts;
