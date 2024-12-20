import React, { useState, useEffect, useContext } from "react";
import { BlogContext } from "../contexts/BlogContext";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify styles

const UpdateBlog = () => {
  const { fetchSingleBlog, updateBlog, singleBlog } = useContext(BlogContext);
  const { id } = useParams(); // Extract blogId from the URL
  const navigate = useNavigate(); // Initialize navigate function

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [existingImage, setExistingImage] = useState(null);

  // Fetch blog data based on the id
  useEffect(() => {
    const loadBlogData = async () => {
      setLoading(true);
      try {
        await fetchSingleBlog(id); // Fetch blog data from context
      } catch (err) {
        setError("Failed to load blog data.");
      } finally {
        setLoading(false);
      }
    };
    loadBlogData();
  }, [id]); // Only depend on 'id'

  // Update form fields when singleBlog data is available
  useEffect(() => {
    if (singleBlog) {
      setTitle(singleBlog.title || "");
      setDescription(singleBlog.description || "");
      setCategory(singleBlog.category || "");
      setTags(singleBlog.tags ? singleBlog.tags.join(", ") : "");
      setExistingImage(singleBlog.mediaUrl || ""); // Set the existing image URL
    }
  }, [singleBlog]); // Depend on 'singleBlog'

  // Handle file input change with size check
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {
      setFileError("File size exceeds the 5MB limit.");
    } else {
      setFileError(null);
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      toast.error("Please fill in all required fields."); // Show error toast
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (file) formData.append("mediaUrl", file); // If a new file is uploaded
    formData.append("category", category);
    formData.append("tags", tags.split(",").map((tag) => tag.trim()));

    try {
      setLoading(true); // Start loading state
      await updateBlog(id, formData); // Call updateBlog function to update data
      toast.success("Blog post updated successfully!"); // Success toast
      navigate("/my-blogs"); // Navigate to 'My Blogs' page after successful update
    } catch (err) {
      setError("Error updating blog: " + err.message); // Handle error
      toast.error("Error updating blog: " + err.message); // Error toast
    } finally {
      setLoading(false); // Stop loading state
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 border rounded-lg shadow-md bg-white dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Update Blog Post</h1>
      {loading ? (
        <p className="text-gray-700 dark:text-gray-300">Loading blog data...</p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium dark:text-gray-300" htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium dark:text-gray-300" htmlFor="description">Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              rows="4"
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* File Upload */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium dark:text-gray-300" htmlFor="file">Upload Image (Max: 5MB)</label>
            {/* Show existing image if available */}
            {existingImage && (
              <div className="mb-4">
                <img
                  src={existingImage}
                  alt="Current Image"
                  className="w-32 h-32 object-cover rounded-md"
                />
                <p className="text-gray-500 text-sm dark:text-gray-400">Current Image</p>
              </div>
            )}
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
            {fileError && (
              <p className="text-red-600 text-sm mt-1 dark:text-red-500">{fileError}</p>
            )}
          </div>

          {/* Category Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium dark:text-gray-300" htmlFor="category">Category</label>
            <input
              type="text"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Tags Input */}
          <div className="flex flex-col space-y-2">
            <label className="text-gray-700 font-medium dark:text-gray-300" htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white dark:border-gray-600"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-4">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-800"
            >
              Update Blog Post
            </button>
          </div>

          {/* Error Message */}
          {error && <p className="text-red-600 text-center mt-4 dark:text-red-500">{error}</p>}
        </form>
      )}
    </div>
  );
};

export default UpdateBlog;
