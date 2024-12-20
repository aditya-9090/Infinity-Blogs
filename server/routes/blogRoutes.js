const express = require('express');
const {
    uploadMedia,
    getAllBlogPosts,
    updateMedia,
    deleteMedia,
    getUserBlogPosts,
    filterBlogPostsByCategory,
    searchBlogPosts,
    getSingleBlogPost, // Import the function to get a single blog post
} = require('../controllers/blogController');

const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Route to upload media and create a blog post
router.post('/posts/upload', protect, uploadMedia);

// Public route to get all blog posts
router.get('/posts/all', getAllBlogPosts);

// Route to get all blog posts for the authenticated user
router.get('/posts/user', protect, getUserBlogPosts);

// Route to update a blog post by ID
router.put('/posts/update/:id', protect, updateMedia);

// Route to delete a blog post by ID
router.delete('/posts/delete/:id', protect, deleteMedia);

// Route to filter blog posts by category
router.get('/posts/filter', filterBlogPostsByCategory);

// Route to search blog posts by title and tags
router.get('/posts/search', searchBlogPosts);

// Route to get a single blog post by ID
router.get('/posts/:id', getSingleBlogPost);

module.exports = router;
