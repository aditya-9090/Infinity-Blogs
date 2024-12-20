const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Registration handler (no validation)
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists (either by email or username)
        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail || existingUsername) {
            return res.status(400).json({
                message: existingEmail ? 'Email already exists' : 'Username already exists',
            });
        }

        // Hash the password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user and save to database
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save(); // Save the new user to the database
        res.status(201).json({ message: 'User registered successfully' }); // Send success message
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: 'Internal server error' }); // Send error message if an exception occurs
    }
};

// Login handler (no validation)
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' }); // If user is not found, return error
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // If passwords don't match, return error
        }

        // Create a JWT token with user info (email and username)
        const token = jwt.sign(
            {
                _id: user._id,
                email: user.email,      // Include email in the JWT payload
                username: user.username // Include username in the JWT payload
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expires in 1 hour
        );

        res.json({ token }); // Return the token to the client
    } catch (error) {
        console.error(error.message); // Log any error that occurs
        res.status(500).json({ error: 'Internal server error' }); // Send error message if an exception occurs
    }
};

// Logout handler (no validation needed for logout)
const logout = (req, res) => {
    // Invalidate the token on client-side or implement a token blacklist
    res.json({ message: 'User logged out successfully' }); // Simple success message for now
};

module.exports = {
    register,
    login,
    logout,
};
