"use client";

import { useState } from "react";
import Sidebar from "./_components/Sidebar";

export default function AdminLayout({ children }) {
  const [isExpanded, setIsExpanded] = useState(true); // State to manage sidebar width

  return (
    <div>
      <Sidebar />

      {children}
    </div>
  );
}
