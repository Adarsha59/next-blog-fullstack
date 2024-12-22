import Link from "next/link"; // Import Link from Next.js
import ToggleTheme from "@/app/(client)/code/_components/ToggleTheme";
import React, { useState } from "react";
import {
  FiHome,
  FiFileText,
  FiFolder,
  FiMessageSquare,
  FiUsers,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { SignOutButton, UserButton, useAuth, useUser } from "@clerk/nextjs";

const AdminNavbar = () => {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const [activeItem, setActiveItem] = useState("dashboard");

  const menuItems = user
    ? [
        {
          id: "dashboard",
          label: "Dashboard",
          path: `/admin/${user.firstName}/dashboard`,
          icon: <FiHome className="w-5 h-5" />,
        },
        {
          id: "posts",
          label: "Posts",
          path: `/admin/${user.firstName}/blogpost`,
          icon: <FiFileText className="w-5 h-5" />,
        },
        // {
        //   id: "comments",
        //   label: "Comments",
        //   path: `/admin/${user.firstName}/comments`,
        //   icon: <FiMessageSquare className="w-5 h-5" />,
        // },
        {
          id: "settings",
          label: "Profile",
          path: `/admin/${user.firstName}/profile`,
          icon: <UserButton className="" />,
        },
        {
          id: "logout",
          label: "Back to Blog",
          path: "/code",
          icon: <FiLogOut className="w-5 h-5" />,
        },
      ]
    : [];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (id) => {
    setActiveItem(id);
    setIsOpen(false);
  };

  return (
    <nav className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <img
              className="h-8 w-8 object-cover"
              src="https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3"
              alt="Admin Logo"
              onError={(e) => {
                e.target.src =
                  "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?ixlib=rb-4.0.3";
              }}
            />
            <span className="ml-2 text-xl font-semibold">Admin Panel</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.path} passHref>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium ${
                    activeItem === item.id
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? (
                <FiX className="block h-6 w-6" />
              ) : (
                <FiMenu className="block h-6 w-6" />
              )}
            </button>
          </div>
          <ToggleTheme />
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <Link key={item.id} href={item.path} passHref>
                <button
                  onClick={() => handleItemClick(item.id)}
                  className={`flex items-center w-full px-3 py-2 rounded-md text-base font-medium ${
                    activeItem === item.id
                      ? "bg-gray-700 text-white"
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </button>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default AdminNavbar;
