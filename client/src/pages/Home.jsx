import React, { useContext, useState, useEffect } from 'react';
import { BlogContext } from '../contexts/BlogContext';
import BlogCard from '../components/BlogCard';
import LoadingAnimation from '../components/LoadingAnimation'; // Import your loading animation component

const Home = () => {
    const { blogs, loading, error, filterBlogsByCategory, searchBlogs } = useContext(BlogContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredBlogs, setFilteredBlogs] = useState(blogs);

    // Trigger a search when the user inputs a search term
    const handleSearch = () => {
        searchBlogs(searchTerm.trim()).then(filteredResults => {
            setFilteredBlogs(filteredResults); // Update the filtered blogs with search results
        });
    };

    // Filter blogs by the selected category
    const handleCategorySelect = (category) => {
        filterBlogsByCategory(category);
    };

    // Display a loading animation while data is being fetched
    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
                <LoadingAnimation />
            </div>
        );
    }

    // Show an error message if there's an issue fetching data
    if (error) {
        return <div className="text-center p-4 text-red-500">An error occurred: {error}</div>;
    }

    // Display a message if no blogs are found after a search or filtering
    const noBlogsFound = filteredBlogs.length === 0;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
            <div className="container mx-auto px-4 py-8 max-w-7xl">
                {/* Page Title */}
                <h1 className="text-4xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
                    Latest Blogs
                </h1>

                {/* Search Bar */}
                <div className="flex justify-center mb-6">
                    <input
                        type="text"
                        placeholder="Search blogs..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)} // Update the search term as the user types
                        className="w-full sm:w-1/2 md:w-1/3 p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 transition-all duration-300"
                    />
                    <button
                        onClick={handleSearch} // Trigger search functionality
                        className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-in-out dark:bg-blue-500 dark:hover:bg-blue-600"
                    >
                        Search
                    </button>
                </div>

                {/* Category Filter Buttons */}
                <div className="flex justify-center space-x-4 mb-6">
                    {['travel', 'food', 'tech', ''].map((category, index) => (
                        <button
                            key={index}
                            onClick={() => handleCategorySelect(category)} // Filter blogs by the selected category
                            className={`px-6 py-3 rounded-full shadow-md transition text-white ${
                                category
                                    ? 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600'
                                    : 'bg-gray-700 hover:bg-gray-800 dark:bg-gray-600 dark:hover:bg-gray-700'
                            }`}
                        >
                            {/* Display category name, or 'All' if no category */}
                            {category ? category.charAt(0).toUpperCase() + category.slice(1) : 'All'}
                        </button>
                    ))}
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {noBlogsFound ? (
                        // Display a message if no blogs are found
                        <div className="text-center col-span-full text-gray-600 dark:text-gray-400">
                            No blogs found.
                        </div>
                    ) : (
                        filteredBlogs.map((blog) => (
                            <BlogCard
                                key={blog._id}
                                blog={blog}
                                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg dark:shadow-xl transition-all duration-300"
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
