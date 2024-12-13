import React from 'react';
import { FiSearch, FiClock, FiMessageCircle } from "react-icons/fi";

const FeaturedPosts = () => {
    const featuredPosts = [
        {
          id: 1,
          title: "The Future of Web Development",
          excerpt: "Exploring the latest trends in web development and what's coming next.",
          image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
          readTime: 5,
          comments: 12
        },
        {
          id: 2,
          title: "Mastering React Hooks",
          excerpt: "A comprehensive guide to using React Hooks effectively in your projects.",
          image: "https://images.unsplash.com/photo-1555099962-4199c345e5dd",
          readTime: 8,
          comments: 24
        },
        {
          id: 3,
          title: "UI Design Trends 2024",
          excerpt: "Discover the latest UI design trends that are shaping the digital world.",
          image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea",
          readTime: 6,
          comments: 18
        },
        {
          id: 4,
          title: "AI in Modern Applications",
          excerpt: "How artificial intelligence is revolutionizing software development.",
          image: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
          readTime: 7,
          comments: 15
        },
        {
          id: 5,
          title: "The Art of Clean Code",
          excerpt: "Best practices for writing maintainable and efficient code.",
          image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713",
          readTime: 10,
          comments: 30
        }
      ];
  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
    <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Featured Posts</h2>
    <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
      {featuredPosts.map((post) => (
        <div
          key={post.id}
          className="min-w-[300px] max-w-[300px] rounded-xl dark:bg-white/5 bg-black/5 border dark:border-white/10 border-black/10 overflow-hidden dark:hover:border-white/30 hover:border-white/30 transition-all duration-300 hover:scale-105 snap-start"
        >
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-40 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
            <p className="dark:text-white/70 text-black/70 text-sm mb-4">{post.excerpt}</p>
            <div className="flex items-center text-sm dark:text-white/50 text-black/50">
              <FiClock className="mr-2" />
              <span className="mr-4">{post.readTime} min read</span>
              <FiMessageCircle className="mr-2" />
              <span>{post.comments} comments</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
  );
}

export default FeaturedPosts;
