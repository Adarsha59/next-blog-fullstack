import React from "react";
import {
  FaRegNewspaper,
  FaRegCheckCircle,
  FaRegEdit,
  FaRegComments,
  FaUsers,
} from "react-icons/fa";

const DashboardOverview = () => {
  const stats = [
    {
      id: 1,
      label: "Total Posts",
      value: 2489,
      icon: <FaRegNewspaper className="w-8 h-8" />,
      textColor: "text-blue-600",
      iconBg: "bg-blue-100",
    },
    {
      id: 2,
      label: "Published Posts",
      value: 1856,
      icon: <FaRegCheckCircle className="w-8 h-8" />,
      textColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
    },
    {
      id: 3,
      label: "Drafts",
      value: 633,
      icon: <FaRegEdit className="w-8 h-8" />,
      textColor: "text-yellow-600",
      iconBg: "bg-yellow-100",
    },
    {
      id: 4,
      label: "Comments",
      value: 12567,
      icon: <FaRegComments className="w-8 h-8" />,
      textColor: "text-purple-600",
      iconBg: "bg-purple-100",
    },
    {
      id: 5,
      label: "Site Traffic",
      value: 156789,
      icon: <FaUsers className="w-8 h-8" />,
      textColor: "text-pink-600",
      iconBg: "bg-pink-100",
    },
  ];

  const StatCard = ({ label, value, icon, textColor, iconBg }) => (
    <div
      className={`dark:bg-transparent border border-b-amber-600 rounded-xl p-6 transition-all duration-300 hover:scale-105 hover:shadow-lg`}
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
    <div className="p-6  rounded-2xl shadow-sm">
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
