"use client";
import React, { useState, useEffect } from "react";
import { FaTwitter, FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { motion } from "framer-motion";
import { BsArrowRight } from "react-icons/bs";
import {
  AiOutlineHeart,
  AiOutlineBulb,
  AiOutlineThunderbolt,
} from "react-icons/ai";

const AboutPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const timelineData = [
    {
      year: "2020",
      title: "Blog Launch",
      description: "Started our journey in the digital space",
    },
    {
      year: "2021",
      title: "1M+ Readers",
      description: "Reached our first milestone",
    },
    {
      year: "2022",
      title: "Award Winning",
      description: "Recognized as top tech blog",
    },
    {
      year: "2023",
      title: "Global Reach",
      description: "Expanded to international audience",
    },
  ];

  const values = [
    {
      icon: <AiOutlineHeart className="text-3xl" />,
      title: "Passion",
      description: "Driven by love for technology",
    },
    {
      icon: <AiOutlineBulb className="text-3xl" />,
      title: "Innovation",
      description: "Pushing boundaries",
    },
    {
      icon: <AiOutlineThunderbolt className="text-3xl" />,
      title: "Impact",
      description: "Making a difference",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 text-white">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center text-center px-4"
      >
        <div className="space-y-6 z-10">
          <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Welcome to TechInsights
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300"
          >
            Sharing Ideas, Inspiring Change
          </motion.p>
        </div>
      </motion.div>

      {/* Biography Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <div className="prose prose-lg text-gray-300">
            <p className="mb-4">
              {showFullBio
                ? "I'm a passionate tech enthusiast and writer with over a decade of experience in the industry. My journey began with a simple curiosity about how things work, which evolved into a deep love for technology and its impact on our daily lives. Through this blog, I share insights, analysis, and stories that matter in the ever-evolving tech landscape. I'm a passionate tech enthusiast and writer with over a decade of experience in the industry. My journey began with a simple curiosity about how things work, which evolved into a deep love for technology and its impact on our daily lives."
                : "I'm a passionate tech enthusiast and writer with over a decade of experience in the industry. My journey began with a simple curiosity about how things work..."}
            </p>
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
            >
              {showFullBio ? "Read Less" : "Read More"}
              <BsArrowRight />
            </button>
          </div>
        </div>
      </section>

      {/* Mission and Values */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="backdrop-blur-lg bg-white/10 rounded-2xl p-6 text-center transition-all hover:shadow-2xl"
            >
              <div className="mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-300">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">Our Journey</h2>
        <div className="space-y-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col md:flex-row gap-4 items-center backdrop-blur-lg bg-white/10 rounded-2xl p-6"
            >
              <div className="text-4xl font-bold text-purple-400">
                {item.year}
              </div>
              <div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="text-xl text-gray-300 mb-8">
            Stay updated with our latest insights and stories
          </p>
          <form className="max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 rounded-lg bg-white/20 backdrop-blur-sm border border-white/30 focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
              Subscribe Now
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 md:px-8 backdrop-blur-lg bg-black/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-center space-x-6 mb-8">
            <FaTwitter className="text-2xl hover:text-purple-400 cursor-pointer transition-colors" />
            <FaInstagram className="text-2xl hover:text-purple-400 cursor-pointer transition-colors" />
            <FaLinkedin className="text-2xl hover:text-purple-400 cursor-pointer transition-colors" />
            <FaGithub className="text-2xl hover:text-purple-400 cursor-pointer transition-colors" />
          </div>
          <div className="text-center text-gray-400">
            <p>© 2024 TechInsights. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AboutPage;
