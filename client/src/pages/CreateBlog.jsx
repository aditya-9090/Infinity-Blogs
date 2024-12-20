import React, { useState, useContext } from 'react';
import { BlogContext } from '../contexts/BlogContext';  // Import BlogContext
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';  // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css';  // Import toast styles
import LoadingAnimation from '../components/LoadingAnimation';  // Import LoadingAnimation component

const CreateBlog = () => {
  const navigate = useNavigate(); // Initialize navigate function
  const { createBlog, loading, error } = useContext(BlogContext);  // Access createBlog from context
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState(null);

  // Handle file input change with size check
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile && selectedFile.size > 5 * 1024 * 1024) {  // 5MB size limit
      setFileError('File size exceeds the 5MB limit.');
    } else {
      setFileError(null);
      setFile(selectedFile);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !file || !category) {
      toast.error('Please fill in all the fields and select a file.'); // Show error toast
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('mediaUrl', file);
    formData.append('category', category.toLowerCase()); // Store category in lowercase
    formData.append('tags', tags.split(',').map((tag) => tag.trim()));

    createBlog(formData);  // Call createBlog function from context
    toast.success('Blog post created successfully!');  // Show success toast
    navigate("/my-blogs");
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-8 border- rounded-2xl shadow-md bg-white dark:bg-gray-800">
      <h1 className="text-3xl font-semibold mb-6 text-center text-gray-900 dark:text-white">Create a Blog Post</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Description Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            rows="4"
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* File Upload */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="file">Upload Image (Max: 5MB)</label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            required
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          {fileError && <p className="text-red-600 text-sm mt-1">{fileError}</p>}
        </div>

        {/* Category Dropdown */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="category">Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="border rounded-md px-4 py-2 w-40 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm md:text-base max-w-full md:max-w-xs mx-auto dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="">Select a category</option>
            <option value="tech">Tech</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
          </select>
        </div>

        {/* Tags Input */}
        <div className="flex flex-col space-y-2">
          <label className="text-gray-700 dark:text-gray-300 font-medium" htmlFor="tags">Tags (comma-separated)</label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="border rounded-md px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center mt-4">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-blue-600 dark:hover:bg-blue-800"
            disabled={loading}
          >
            {loading ? <LoadingAnimation /> : 'Create Blog Post'} {/* Show Loading Animation if loading */}
          </button>
        </div>

        {/* Error Message */}
        {error && <p className="text-red-600 text-center mt-4">{error}</p>}
      </form>
    </div>
  );
};

export default CreateBlog;
