"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaRegNewspaper,
  FaRegCheckCircle,
  FaRegEdit,
  FaRegComments,
  FaUsers,
} from "react-icons/fa";

const DashboardOverview = () => {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/blog/read");
        const postsData = response.data.data;
        setPosts(postsData);
        console.log("object", postsData);
        // Calculate statistics
        const totalPosts = postsData.length;
        const drafts = postsData.filter(
          (post) => post.status === "draft"
        ).length;
        const published = postsData.filter(
          (post) => post.status === "published"
        ).length;

        // Update stats
        setStats([
          {
            id: 1,
            label: "Total Postss",
            value: totalPosts,
            icon: <FaRegNewspaper className="w-8 h-8" />,
            bgColor: "bg-blue-50",
            textColor: "text-blue-600",
            iconBg: "bg-blue-100",
          },
          {
            id: 2,
            label: "Published Posts",
            value: published,
            icon: <FaRegCheckCircle className="w-8 h-8" />,
            bgColor: "bg-green-50",
            textColor: "text-green-600",
            iconBg: "bg-green-100",
          },
          {
            id: 3,
            label: "Drafts",
            value: drafts,
            icon: <FaRegEdit className="w-8 h-8" />,
            bgColor: "bg-yellow-50",
            textColor: "text-yellow-600",
            iconBg: "bg-yellow-100",
          },
          {
            id: 4,
            label: "Comments",
            value: 12567, // Placeholder value for now
            icon: <FaRegComments className="w-8 h-8" />,
            bgColor: "bg-purple-50",
            textColor: "text-purple-600",
            iconBg: "bg-purple-100",
          },
          {
            id: 5,
            label: "Site Traffic",
            value: 156789, // Placeholder value for now
            icon: <FaUsers className="w-8 h-8" />,
            bgColor: "bg-pink-50",
            textColor: "text-pink-600",
            iconBg: "bg-pink-100",
          },
        ]);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const StatCard = ({ label, value, icon, bgColor, textColor, iconBg }) => (
    <div
      className={`${bgColor} rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
      role="group"
      aria-label={`${label} statistics`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{label}</p>
          <h3 className={`${textColor} text-2xl font-bold`}>
            {value.toLocaleString()}
          </h3>
        </div>
        <div className={`${iconBg} p-3 rounded-full ${textColor}`}>{icon}</div>
      </div>
    </div>
  );

  return (
    <div className="p-6 rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
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
