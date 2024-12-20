const express = require('express');
const { register, login, logout } = require('../controllers/userController');

const router = express.Router();

// Route for user registration
router.post('/register', register);

// Route for user login
router.post('/login', login);

// Route for user logout
router.post('/logout', logout);

module.exports = router;
