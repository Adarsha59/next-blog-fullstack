import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaMoon, FaSun, FaBars, FaTimes, FaSearch } from "react-icons/fa";
const Footer = () => {
  return (
    <div>
        {/* Footer */}
        <footer className="bg-gray-100 dark:bg-gray-800 ">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">About Us</h3>
              <p className="text-gray-600 dark:text-gray-300">Your go-to source for web development insights and tutorials.</p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Terms of Service</a></li>
                <li><a href="#" className="text-gray-600 dark:text-gray-300 hover:text-blue-500">Contact Us</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <FaFacebook className="text-2xl hover:text-blue-600 cursor-pointer" />
                <FaTwitter className="text-2xl hover:text-blue-400 cursor-pointer" />
                <FaInstagram className="text-2xl hover:text-pink-600 cursor-pointer" />
                <FaLinkedin className="text-2xl hover:text-blue-800 cursor-pointer" />
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
            <p className="text-gray-600 dark:text-gray-300">&copy; 2024 Blog Website. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
