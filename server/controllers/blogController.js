const Blog = require("../models/Blog");
const uploadToCloudinary = require("../utils/uploadToCloudinary");
const uploadSingle = require("../middleware/multerMiddleware");
const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const fs = require("fs"); // Import the File System module

// Controller function to handle media uploads and create a blog post
const uploadMedia = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      console.error("Multer error:", err);
      return res.status(400).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const localFilePath = req.file.path; // Store the local file path

    try {
      const mediaUrl = await uploadToCloudinary(localFilePath); // Use the local file path for Cloudinary upload

      const newBlogPost = new Blog({
        title: req.body.title,
        description: req.body.description,
        mediaUrl,
        category: req.body.category,
        tags: req.body.tags,
        user: req.user._id,
        username: req.user.username, // Ensure req.user contains the username
      });

      await newBlogPost.save();

      // Unlink (delete) the file from local storage
      fs.unlink(localFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting local file:", unlinkErr);
        } else {
          console.log("Local file deleted successfully");
        }
      });

      res.json({
        message: "Media uploaded successfully",
        mediaUrl,
        blogPost: newBlogPost,
      });
    } catch (error) {
      console.error("Error in uploadMedia:", error);
      // Attempt to unlink the file if an error occurs during upload or save
      fs.unlink(localFilePath, (unlinkErr) => {
        if (unlinkErr) {
          console.error("Error deleting local file during error handling:", unlinkErr);
        }
      });

      res.status(500).json({ error: error.message || "Internal server error" });
    }
  });
};

// Controller function to get all blog posts by the authenticated user
const getUserBlogPosts = async (req, res) => {
  try {
    const userId = req.user._id;
    

    const userBlogPosts = await Blog.find({ user: userId });
    res.json(userBlogPosts);
  } catch (error) {
    console.error("Error in getUserBlogPosts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to get all blog posts (public access)
const getAllBlogPosts = async (req, res) => {
  try {
    const blogPosts = await Blog.find();
    res.json(blogPosts);
  } catch (error) {
    console.error("Error in getAllBlogPosts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to update blog posts (auth access)
const updateMedia = async (req, res) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const { id } = req.params;
      const trimmedId = id.trim();

      // Check for valid ObjectId
      if (!mongoose.isValidObjectId(trimmedId)) {
        return res.status(400).json({ error: "Invalid ID format" });
      }

      const updatedData = {};

      // Only update fields if they are provided
      if (req.body.title) updatedData.title = req.body.title;
      if (req.body.description) updatedData.description = req.body.description;
      if (req.body.category) updatedData.category = req.body.category;
      if (req.body.tags) updatedData.tags = req.body.tags;

      // Fetch the existing blog post to get the old mediaUrl
      const existingPost = await Blog.findOne({ _id: trimmedId, user: req.user._id });

      if (!existingPost) {
        return res.status(404).json({
          error: "Blog post not found or you do not have permission to update this post",
        });
      }

      // Check if a new file is uploaded
      if (req.file) {
        const mediaUrl = await uploadToCloudinary(req.file.path); // Use path for upload
        updatedData.mediaUrl = mediaUrl;

        // Unlink (delete) the old media file from local storage
        const localFilePath = req.file.path; // Store the local file path
        fs.unlink(localFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting local file:", unlinkErr);
          } else {
            console.log("Local file deleted successfully");
          }
        });

        // Delete the old media from Cloudinary
        const publicId = existingPost.mediaUrl.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(publicId, { resource_type: "image" });
      }

      // Update the blog post in the database
      const updatedPost = await Blog.findOneAndUpdate(
        { _id: trimmedId, user: req.user._id },
        updatedData,
        { new: true }
      );

      res.json({
        message: "Blog post updated successfully",
        blogPost: updatedPost,
      });
    } catch (error) {
      console.error("Error in updateMedia:", error);
      // Attempt to unlink the file if an error occurs during upload or save
      if (req.file) {
        const localFilePath = req.file.path; // Store the local file path
        fs.unlink(localFilePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting local file during error handling:", unlinkErr);
          }
        });
      }
      res.status(500).json({ error: "Internal server error" });
    }
  });
};

// Controller function to delete media and blog post
const deleteMedia = async (req, res) => {
  try {
    const { id } = req.params;
    const trimmedId = id.trim(); // Trim any whitespace or newline characters

    // Check if the blog post exists and the user has permission to delete it
    const blogPost = await Blog.findOne({ _id: trimmedId, user: req.user._id });
    if (!blogPost) {
      return res.status(404).json({
        error: "Blog post not found or you do not have permission to delete this post",
      });
    }

    // Extract the public ID from the media URL for Cloudinary
    const publicId = blogPost.mediaUrl.split("/").pop().split(".")[0];

    // Delete the image from Cloudinary
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" });

    // Delete the blog post from the database
    await Blog.findByIdAndDelete(trimmedId);

    // Respond with success message
    res.json({ message: "Media and blog post deleted successfully" });
  } catch (error) {
    console.error("Error in deleteMedia:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Controller function to filter blog posts by category
const filterBlogPostsByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    // Trim the category value to remove whitespace and newline characters
    const trimmedCategory = category ? category.trim() : '';

    const query = trimmedCategory ? { category: trimmedCategory } : {};

    const blogPosts = await Blog.find(query);
    res.json(blogPosts);
  } catch (error) {
    console.error("Error in filterBlogPostsByCategory:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller function to search blog posts by title, description, tags, and username
const searchBlogPosts = async (req, res) => {
  try {
    const { searchTerm } = req.query;  // Use a general 'searchTerm' query param
    const query = {};

    // If there's a searchTerm, search across title, description, tags, and username
    if (searchTerm && searchTerm.trim() !== "") {
      const regex = new RegExp(searchTerm.trim(), 'i');  // Case-insensitive regex search

      // Build the query to search across title, description, tags, and username
      query.$or = [
        { title: { $regex: regex } },            // Search in title
        { description: { $regex: regex } },      // Search in description
        { tags: { $in: [searchTerm.trim()] } },  // Search in tags (exact match in array)
        { username: { $regex: regex } }          // Search in username
      ];
    }

    // If no searchTerm is provided, return all blog posts
    const blogPosts = await Blog.find(query);  // Perform the search query

    if (!blogPosts.length) {
      return res.status(404).json({ message: "No blogs found matching your search criteria." });
    }

    res.json(blogPosts);  // Return found blog posts
  } catch (error) {
    console.error("Error in searchBlogPosts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


// Controller function to get a single blog post by ID
const getSingleBlogPost = async (req, res) => {
  try {
    const { id } = req.params;
    const trimmedId = id.trim(); // Ensure no trailing or leading spaces

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.isValidObjectId(trimmedId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    // Find the blog post by ID
    const blogPost = await Blog.findById(trimmedId);
    if (!blogPost) {
      return res.status(404).json({ error: "Blog post not found" });
    }

    res.json(blogPost);
  } catch (error) {
    console.error("Error in getSingleBlogPost:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = {
  uploadMedia,
  getUserBlogPosts,
  getAllBlogPosts,
  updateMedia,
  deleteMedia,
  filterBlogPostsByCategory,
  searchBlogPosts,
  getSingleBlogPost
};
