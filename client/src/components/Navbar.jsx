import React, { useContext, useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaUser,
  FaBlog,
  FaPlus,
  FaSignOutAlt,
  FaSignInAlt,
  FaInfoCircle,
  FaMoon,
  FaSun,
  FaHome,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { UserContext } from "../contexts/UserContext";
import whiteLogo from "../assets/whitelogo.png";
import { motion } from "framer-motion"; // Import framer-motion

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedPreference = localStorage.getItem("darkMode");
    if (storedPreference !== null) {
      return JSON.parse(storedPreference);
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleLogout = () => {
    logout();
    setMenuOpen(false); 
    toast.success("You have logged out successfully!");
  };

  const handleMenuItemClick = () => {
    setMenuOpen(false);
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("darkMode", JSON.stringify(newDarkMode));
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const renderMenuItems = () => {
    if (user) {
      return (
        <>
          <div className="flex justify-between items-center pl-3 py-2 text-blue-400 font-semibold text-xl mb-2 space-x-2">
            <div>Welcome, <span className="text-white">{user.username}</span></div>
          </div>
          <Link to="/" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/my-blogs" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaBlog className="mr-2" /> My Blogs
          </Link>
          <Link to="/create-blog" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaPlus className="mr-2" /> Create Blog
          </Link>
          <Link to="/about-us" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaInfoCircle className="mr-2" /> About Us
          </Link>
          <Link to="/">
            <button onClick={handleLogout} className="flex items-center bg-red-600 hover:bg-red-700 text-white font-semibold my-3 py-2 px-4 rounded transition duration-300">
              <FaSignOutAlt className="mr-2" /> Logout
            </button>
          </Link>
        </>
      );
    } else {
      return (
        <>
          <Link to="/" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaHome className="mr-2" /> Home
          </Link>
          <Link to="/about-us" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaInfoCircle className="mr-2" /> About Us
          </Link>
          <Link to="/login" onClick={handleMenuItemClick} className="flex items-center hover:bg-blue-600 transition duration-300 rounded px-4 py-2 border-b border-gray-300">
            <FaSignInAlt className="mr-2" /> Login
          </Link>
        </>
      );
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center p-4 bg-gray-800 text-white shadow-lg border-t border-b border-white transition duration-300 ease-in-out hover:bg-gray-800">
      <Link to="/" className="transition duration-300 ease-in-out transform hover:scale-105">
        <img src={whiteLogo} alt="Logo" className="w-16 transform" />
      </Link>
      <div className="relative md:flex hidden space-x-8 items-center">
        {renderMenuItems()}
        <button onClick={toggleDarkMode} className="flex items-center space-x-2 text-xl p-2 ml-6 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300">
          {isDarkMode ? <FaSun /> : <FaMoon />}
          <span className="ml-2">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
        </button>
      </div>
      <div className="relative md:hidden">
        <button onClick={toggleMenu} className="p-2 text-white focus:outline-none hover:bg-gray-700 rounded-full transition duration-300" aria-expanded={menuOpen ? "true" : "false"} aria-controls="mobile-menu">
          <FaBars />
        </button>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            ref={menuRef}
            className="absolute top-0 right-0 mt-8 bg-gray-900 text-white rounded-lg shadow-lg p-4 w-48"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div>{renderMenuItems()}</div>
            <button onClick={toggleDarkMode} className="flex items-center space-x-2 text-m p-2 mt-4 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition duration-300">
              {isDarkMode ? <FaSun /> : <FaMoon />}
              <span className="ml-2">{isDarkMode ? "Light Mode" : "Dark Mode"}</span>
            </button>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;