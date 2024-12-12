'use client';

import { useState, useEffect } from 'react';
import { IoMdSunny,IoMdMoon } from "react-icons/io";
export default function ToggleTheme() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      setTheme('light');
    }
  }, []);

  const toggleTheme = () => {
    if (theme === 'light') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      setTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      setTheme('light');
    }
  };

  return (
       
            <button
              onClick={toggleTheme}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700"
              aria-label="Toggle Theme"
            >
              {theme === 'light' ? (
                <IoMdMoon className="w-6 h-6" />
                
              ) : (
                <IoMdSunny   className="w-6 h-6 text-yellow-400" />
              )}
            </button>
         
  );
}
