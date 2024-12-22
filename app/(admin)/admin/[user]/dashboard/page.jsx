"use client";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import {
  FaRegNewspaper,
  FaRegCheckCircle,
  FaRegEdit,
  FaRegComments,
  FaUsers,
} from "react-icons/fa";

const DashboardOverview = () => {
  const { user } = useUser();

  // Add a check to ensure user exists
  if (!user) {
    return <div>Loading...</div>; // or any loading state you prefer
  }

  console.log("object overview", user.fullName);

  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const data = response.data.data;

        // Filter posts authored by the current user
        const postsData = data.filter((post) => post.author === user.fullName);

        // Calculate statistics
        const totalPosts = postsData.length;
        const publishedPosts = postsData.filter(
          (post) => post.status === "published"
        ).length;
        const draftPosts = postsData.filter(
          (post) => post.status === "draft"
        ).length;
        const comments = postsData.filter((post) => post.comments).length;

        // Update stats array dynamically
        setStats([
          {
            id: 1,
            label: "Total Posts",
            value: totalPosts,
            icon: <FaRegNewspaper className="w-8 h-8" />,
            borderColor: "border-blue-500",
            textColor: "text-blue-600",
            iconBg: "bg-blue-100",
          },
          {
            id: 2,
            label: "Published Posts",
            value: publishedPosts,
            icon: <FaRegCheckCircle className="w-8 h-8" />,
            borderColor: "border-green-500",
            textColor: "text-green-600",
            iconBg: "bg-green-100",
          },
          {
            id: 3,
            label: "Drafts",
            value: draftPosts,
            icon: <FaRegEdit className="w-8 h-8" />,
            borderColor: "border-yellow-500",
            textColor: "text-yellow-600",
            iconBg: "bg-yellow-100",
          },
        ]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, [user]); // Add user as dependency to re-fetch when user changes

  const StatCard = ({ label, value, icon, borderColor, textColor, iconBg }) => (
    <div
      className={`bg-transparent border-2 border-purple-400 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
      role="group"
      aria-label={`${label} statistics`}
    >
      <Link href={`/admin/${user.fullName}/blogpost`}>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
            <h3 className={`${textColor} text-2xl font-bold`}>
              {value.toLocaleString()}
            </h3>
          </div>
          <div className={`${iconBg} p-3 rounded-full ${textColor}`}>
            {icon}
          </div>
        </div>
      </Link>
    </div>
  );

  return (
    <div className="p-6 rounded-2xl shadow-sm ">
      <h2 className="text-2xl font-bold text-gray-200 mb-6">
        Dashboard Overview
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.id} {...stat} />
        ))}
      </div>
    </div>
  );
};

export default DashboardOverview;
