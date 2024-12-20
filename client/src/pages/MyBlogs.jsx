import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogContext } from '../contexts/BlogContext';
import MyBlogCard from '../components/MyBlogCard'; // Import your new MyBlogCard component
import LoadingAnimation from '../components/LoadingAnimation'; // Import the LoadingAnimation component

const MyBlogs = () => {
    const { userBlogs, loading, error, fetchUserBlogs, deleteBlog } = useContext(BlogContext);

    useEffect(() => {
        fetchUserBlogs(); // Fetch user blogs when the component mounts
    }, []); // Add fetchUserBlogs to the dependency array

    // Handle the delete functionality
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this blog?')) {
            deleteBlog(id); // Call the delete function from context
        }
    };

    // Display a loading spinner while fetching data
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <LoadingAnimation />
            </div>
        );
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>; // Display error message
    }

    return (
        <div className="container mx-auto px-4 py-8 ">
            <h1 className="text-4xl font-bold mb-6 text-center text-gray-800 dark:text-gray-300">
                My Blogs
            </h1>

            {/* Display total blog count */}
            <p className="text-lg text-center text-gray-600 dark:text-gray-400 mb-6">
                Total {userBlogs?.length || 0} blog(s).
            </p>

            {/* Button for creating a new blog */}
            <div className="flex justify-end mb-4">
                <Link
                    to="/create-blog"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
                >
                    Create New Blog
                </Link>
            </div>

            {/* Blog cards */}
            <div className="space-y-6">
                {userBlogs?.length > 0 ? (
                    userBlogs.map((blog) => (
                        <MyBlogCard
                            key={blog._id}
                            blog={blog}
                            onUpdate={() => handleUpdate(blog._id)} // If you have handleUpdate function defined elsewhere
                            onDelete={() => handleDelete(blog._id)} // Pass delete handler
                        />
                    ))
                ) : (
                    <div className="text-center">No blogs found.</div>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
