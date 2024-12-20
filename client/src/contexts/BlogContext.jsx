import React, { createContext, useState, useEffect } from "react";
import api from "../services/api"; // Import the configured Axios instance

// Create the BlogContext
const BlogContext = createContext();

// BlogProvider component to wrap around the application or component tree
const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [userBlogs, setUserBlogs] = useState([]);
  const [singleBlog, setSingleBlog] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all blog posts (public) initially
  useEffect(() => {
    fetchAllBlogs();
  }, []);

  const fetchAllBlogs = async () => {
    setLoading(true);
    try {
      const response = await api.get("/blogs/posts/all");
      setBlogs(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchUserBlogs = async () => {
    const token = localStorage.getItem("token");
    console.log("Token:", token); // Check if token exists before making the request
    setLoading(true);
    try {
      const response = await api.get("/blogs/posts/user");
      setUserBlogs(response.data);
      console.log(response.data); // Log the response data
    } catch (err) {
      setError(err.message);
      console.error("Error fetching blogs:", err);
    } finally {
      setLoading(false);
    }
  };

  const createBlog = async (formData) => {
    setLoading(true);
    try {
      const response = await api.post("/blogs/posts/upload", formData, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      });
      setBlogs((prevBlogs) => [response.data.blogPost, ...prevBlogs]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Update an existing blog post
  const updateBlog = async (id, formData) => {
    setLoading(true);
    try {
      const response = await api.put(`/blogs/posts/update/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setBlogs((prevBlogs) =>
        prevBlogs.map((blog) =>
          blog._id === response.data.blogPost._id
            ? response.data.blogPost
            : blog
        )
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a blog post
  const deleteBlog = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/blogs/posts/delete/${id}`);
      setUserBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Filter blog posts by category
  const filterBlogsByCategory = async (category) => {
    setLoading(true);
    try {
      const response = await api.get(`/blogs/posts/filter`, {
        params: { category },
      });
      setBlogs(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Search blog posts by searchTerm
  const searchBlogs = async (searchTerm) => {
    setLoading(true);
    try {
      // Send the search term as a query parameter
      const response = await api.get(`/blogs/posts/search`, {
        params: { searchTerm },
      });
      setBlogs(response.data); // Update the state with the blog posts
    } catch (err) {
      setError(err.message); // Handle any errors
    } finally {
      setLoading(false); // Set loading to false once the request completes
    }
  };

  const fetchSingleBlog = async (id) => {
    setLoading(true);
    try {
      const response = await api.get(`/blogs/posts/${id}`);
      setSingleBlog(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blogs,
        userBlogs,
        loading,
        singleBlog,
        error,
        fetchUserBlogs,
        createBlog,
        updateBlog,
        deleteBlog,
        filterBlogsByCategory,
        fetchSingleBlog,
        searchBlogs,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

export { BlogContext, BlogProvider };
