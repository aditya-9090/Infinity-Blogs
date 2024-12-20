import React from "react";
import whiteLogo from "../assets/whitelogo.png"; // Adjust the path as per your folder structure

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Footer Content Container */}
        <div className="flex flex-col items-center space-y-6">
          {/* Logo or Blog Name */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <img src={whiteLogo} alt="Infinity Blogs Logo" className="h-12" />
              <h1 className="text-2xl font-semibold">Infinity Blogs</h1>
            </div>
           
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col items-center space-y-4">
            <a href="/" className="hover:text-blue-400 transition-colors">
              Home
            </a>
            <a href="/about-us" className="hover:text-blue-400 transition-colors">
              About Us
            </a>
            <a href="/contact-us" className="hover:text-blue-400 transition-colors">
              Contact Us
            </a>
          </div>

          {/* Copyright Section */}
          <div className="text-center text-gray-400 text-sm">
            <p>© {new Date().getFullYear()} Infinity Blogs. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
