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
import Image from "next/image";

const AboutPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen ">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        className="relative h-screen flex items-center justify-center text-center px-4"
      >
        <div className="space-y-6 z-10">
          <div className="w-32 h-17 mx-auto rounded-full overflow-hidden border-4 border-white shadow-xl">
            <Image
              src="/images/about.jpg"
              alt="Profile"
              width={120}
              height={10}
              className="object-cover"
            />
          </div>
          <motion.h1
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-5xl md:text-6xl font-bold"
          >
            Welcome to My World
          </motion.h1>
          <motion.p
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl "
          >
            A Journey Through Technology and Innovation
          </motion.p>
        </div>
      </motion.div>

      {/* Biography Section */}
      <section className="py-20 px-4 md:px-8 max-w-6xl mx-auto">
        <div className="backdrop-blur-lg  rounded-3xl p-8 shadow-xl">
          <h2 className="text-3xl font-bold mb-6">About Me</h2>
          <div className="prose prose-lg ">
            <p className="mb-4">
              I am Aadarsha Paudyal, a passionate tech enthusiast and electronic
              engineer with a love for innovative solutions. Over the years,
              I’ve been involved in various tech projects that have challenged
              me to think outside the box and push the boundaries of what’s
              possible.
            </p>
            <button
              onClick={() => setShowFullBio(!showFullBio)}
              className="flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors"
              aria-label={showFullBio ? "Read Less" : "Read More"}
            >
              {showFullBio ? "Read Less" : "Read More"}
              <BsArrowRight />
            </button>
            {showFullBio && (
              <p className="mt-4">
                For more about my journey and work, visit my website:
                <a
                  href="https://aadarshapaudyal.com.np/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Aadarsha Paudyal
                </a>
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
