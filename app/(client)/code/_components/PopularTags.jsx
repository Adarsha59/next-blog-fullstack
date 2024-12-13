import React from 'react';

const PopularTags = () => {
    const popularTags = [
        "React", "JavaScript", "Web Development", "UI/UX", "Programming",
        "CSS", "Technology", "Design", "Frontend", "Backend"
      ];
  return (
   <>
   <h2 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">Popular Tags</h2>
      <div className="flex flex-wrap gap-2">
        {popularTags.map((tag, index) => (
          <button
            key={index}
            className="px-4 py-2 rounded-full bg-white/5 border dark:border-white/10 border-black/10 dark:hover:border-white/30 hover:border-white/30 transition-all duration-300 hover:scale-105"
          >
            {tag}
          </button>
        ))}
      </div>
   </>
  );
}

export default PopularTags;
