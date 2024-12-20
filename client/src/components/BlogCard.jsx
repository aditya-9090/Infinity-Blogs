import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ blog }) => {
    return (
        <div className="bg-primary text-secondary shadow-md rounded-3xl overflow-hidden transition transform duration-300 hover:shadow-2xl hover:-translate-y-2  dark:bg-gray-800 dark:shadow-xl">
            {blog.mediaUrl && (
                <img
                    src={blog.mediaUrl}
                    alt={blog.title}
                    className="w-full h-56 object-cover transition-transform duration-300 transform hover:scale-105"
                />
            )}
            <div className="p-5">
                <h2 className="text-xl font-bold mb-2">{blog.title}</h2>
                <p className="text-secondary text-sm mb-2  dark:bg-gray-800 dark:shadow-xl">By {blog.username}</p>
                <p className="text-secondary mb-4">{blog.description.slice(0, 100)}...</p>
                {blog.category && (
                    <span className="inline-block bg-accent text-white text-xs rounded-full px-3 py-1 mb-2 font-medium">
                        {blog.category}
                    </span>
                )}
                {blog.tags && blog.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {blog.tags.map((tag, index) => (
                            <span
                                key={index}
                                className="bg-green-100 text-green-600 text-xs rounded-full px-2 py-1 shadow-sm"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                <Link
                    to={`/blogs/${blog._id}`}
                    className="block text-center text-white font-semibold bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-lg transition duration-200"
                >
                    Read More
                </Link>
            </div>
        </div>
    );
};

export default BlogCard;
