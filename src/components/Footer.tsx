import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 text-center text-sm text-gray-500">
          <p>© {currentYear} ミニマムBlog. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
