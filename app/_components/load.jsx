"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaAtom } from "react-icons/fa";
import { useRouter } from "next/navigation";

const LoadingAnimation = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      router.push("/code");
      // Navigate to the next route after animation
      // window.location.href = "/code";
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black animate-gradient">
            {/* Particle Effect replaced with CSS */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-purple-900 to-black bg-cover bg-center animate-particles"></div>
          </div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="relative z-10"
          >
            <div className="flex flex-col items-center justify-center space-y-8">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px #fff",
                    "0 0 60px #00f",
                    "0 0 20px #fff",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="p-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              >
                <FaAtom className="w-24 h-24 text-white animate-spin-slow" />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-4xl md:text-6xl font-bold text-white font-futuristic tracking-wider"
              >
                NEXT-BLOG BY ADARSHA
              </motion.h1>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 4, ease: "easeInOut" }}
                className="w-64 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full"
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default LoadingAnimation;
