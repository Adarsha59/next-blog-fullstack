"use client";

import Footer from "./_components/Footer";
import BlogHomepage from "./_components/Main";
import BlogWebsite from "./_components/NavBar";

export default function AdminLayout({ children }) {
  return (
    <div>
      <main>
        <BlogWebsite />
        {children}
        <Footer />
      </main>
    </div>
  );
}
