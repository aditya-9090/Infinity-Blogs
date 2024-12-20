import React, { useContext, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BlogContext } from "../contexts/BlogContext";
import LoadingAnimation from "../components/LoadingAnimation";

const BlogDetails = () => {
  const { id } = useParams();
  const { fetchSingleBlog, singleBlog, loading, error } =
    useContext(BlogContext);

  useEffect(() => {
    fetchSingleBlog(id);
  }, [id]);

  if (loading) return <LoadingAnimation />;
  if (error)
    return <p className="text-center text-xl text-red-600">Error: {error}</p>;
  if (!singleBlog)
    return (
      <p className="text-center text-xl text-secondary">
        No blog details found.
      </p>
    );

  return (
    <div className="max-w-4xl mx-auto px-6 py-10 bg-primary text-secondary shadow-2xl rounded-xl dark:bg-gray-800 dark:shadow-xl">
      {/* Back to Blogs Button */}
      {/* <Link
        to="/"
        className="text-accent text-lg font-semibold hover:text-accent-dark hover:underline mb-8 block transition-all duration-300 transform hover:scale-105"
      >
        &lt; Back to Blogs
      </Link> */}

      {/* Blog Title */}
      <h1 className="text-5xl font-serif text-primary-dark mb-6 tracking-wide">
        {singleBlog.title}
      </h1>

      {/* Blog Author and Date */}
      <div className="flex items-center text-secondary mb-6 space-x-3">
        <p className="text-sm font-semibold">By {singleBlog.username}</p>
        <span className="text-xs">•</span>
        <p className="text-sm">
          {new Date(singleBlog.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* Blog Image with Responsive Styling */}
      {singleBlog.mediaUrl && (
        <div className="overflow-hidden rounded-2xl shadow-lg mb-8">
          <img
            src={singleBlog.mediaUrl}
            alt={singleBlog.title}
            className="w-full h-auto max-h-96 object-cover transition-transform transform hover:scale-105"
          />
        </div>
      )}

      {/* Blog Description */}
      <p className="text-lg text-primary-dark mb-8 leading-relaxed">
        {singleBlog.description}
      </p>

      {/* Tags Section with Hover and Animation */}
      {singleBlog.tags && singleBlog.tags.length > 0 && (
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-primary-dark mb-4">
            Tags:
          </h2>
          <ul className="flex flex-wrap gap-4">
            {singleBlog.tags.map((tag, index) => (
              <li key={index}>
                <span className="bg-accent-light text-accent text-xs px-4 py-2 rounded-full hover:bg-accent-dark cursor-pointer transition-all duration-300">
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Category Section with Color Accent */}
      {singleBlog.category && (
        <p className="text-lg font-semibold text-secondary">
          Category:{" "}
          <span className="text-accent">{singleBlog.category}</span>
        </p>
      )}
    </div>
  );
};

export default BlogDetails;
