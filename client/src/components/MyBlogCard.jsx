import React from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast

const MyBlogCard = ({ blog, onDelete }) => {
  const handleDelete = (id) => {
    // Call the onDelete function passed from the parent
    onDelete(id);

    // Show a success toast notification
    toast.success("Blog deleted successfully!");
  };

  return (
    <div className="bg-primary text-secondary shadow-xl rounded-lg overflow-hidden mb-6 transition-all duration-300 transform hover:shadow-2xl hover:scale-105 dark:bg-gray-900 dark:shadow-xl">
      <div className="flex flex-col sm:flex-row items-center p-5 space-x-6">
        {/* Blog Image */}
        {blog.mediaUrl && (
          <img
            src={blog.mediaUrl}
            alt={blog.title}
            className="w-32 h-32 object-cover rounded-md border-4 border-gradient-to-r from-pink-500 via-red-500 to-yellow-500 mb-4 sm:mb-0"
          />
        )}

        {/* Blog Info */}
        <div className="flex flex-col w-full">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">{blog.title}</h2>
          {blog.category && (
            <span className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white text-xs rounded-full px-3 py-1 mb-4 font-medium">
              {blog.category}
            </span>
          )}
          <div className="flex flex-wrap justify-start gap-4 mt-4">
            {/* View Button */}
            <Link
              to={`/blogs/${blog._id}`}
              className="bg- from-blue-700 to-blue-800 hover:bg-gradient-to-r hover:from-blue-800 hover:to-blue-900 text-white py-2 px-6 rounded-lg border-2 border-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              View
            </Link>

            {/* Update Button */}
            <Link to={`/update-blog/${blog._id}`}>
              <button className="bg- from-teal-500 to-teal-600 hover:bg-gradient-to-r hover:from-teal-600 hover:to-teal-700 text-white py-2 px-6 rounded-lg border-2 border-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50">
                Update
              </button>
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => handleDelete(blog._id)} // Trigger handleDelete
              className="bg- from-red-600 to-red-700 hover:bg-gradient-to-r hover:from-red-700 hover:to-red-800 text-white py-2 px-6 rounded-lg border-2 border-white transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyBlogCard;
