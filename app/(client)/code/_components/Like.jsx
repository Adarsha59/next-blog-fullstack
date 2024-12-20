import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios"; // Import axios for HTTP requests

const LikeButton = ({ blogId }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [particles, setParticles] = useState([]);

  const generateParticles = () => {
    const newParticles = [];
    for (let i = 0; i < 8; i++) {
      const angle = (Math.PI * 2 * i) / 8;
      newParticles.push({
        id: i,
        x: Math.cos(angle) * 20,
        y: Math.sin(angle) * 20,
      });
    }
    return newParticles;
  };

  const handleClick = async () => {
    setIsLiked(!isLiked);
    if (!isLiked) {
      setParticles(generateParticles());
      setTimeout(() => setParticles([]), 1000);
    }

    try {
      if (blogId) {
        // Make a POST request to your backend API
        const response = await axios.post("/api/blog/like", { blogId });
        console.log("Like submitted successfully:", response.data);
      }
    } catch (error) {
      console.error("Error submitting like:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <motion.button
          whileHover={{
            scale: 1.1,
            rotateZ: 5,
            transition: { duration: 0.2 },
          }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClick}
          className={`
            relative
            p-4
            rounded-full
            transition-all
            duration-300
            transform
            focus:outline-none
            focus:ring-2
            focus:ring-offset-2
            focus:ring-red-500
            ${isLiked ? "bg-red-50" : "bg-white"}
            hover:shadow-xl
            active:shadow-inner
          `}
          aria-label={isLiked ? "Unlike" : "Like"}
        >
          <motion.div
            animate={{
              scale: isLiked ? [1, 1.2, 1] : 1,
              transition: { duration: 0.3 },
            }}
          >
            <FaHeart
              className={`
                w-8
                h-8
                transition-colors
                duration-300
                ${
                  isLiked
                    ? "text-red-500 filter drop-shadow-lg"
                    : "text-gray-400"
                }
              `}
            />
          </motion.div>

          {isLiked && (
            <div className="absolute inset-0">
              <div className="absolute inset-0 animate-ping rounded-full bg-red-400 opacity-20"></div>
            </div>
          )}
        </motion.button>

        <AnimatePresence>
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [1, 0],
                x: particle.x,
                y: particle.y,
              }}
              exit={{ scale: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2"
            >
              <FaHeart className="text-red-500 text-sm animate-pulse" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default LikeButton;
