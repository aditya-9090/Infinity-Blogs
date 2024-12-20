// Import required modules
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const userRoutes = require('./routes/userRoutes');
const cloudinary = require('./config/cloudinaryConfig');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

// Create an Express application
const app = express();

// Middleware to enable CORS for all routes
app.use(cors({
    origin: ['*', 'http://localhost:5173'], // Allows any origin and localhost:5173
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Enable CORS preflight for all routes
app.options('*', cors());

// Middleware to parse incoming JSON requests
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static('uploads'));

// Define API routes
app.use('/api/blogs', blogRoutes);
app.use('/api/users', userRoutes);

// Simple GET endpoint for the root route
app.get('/', (req, res) => res.send('API is running'));

// Log Authorization header for debugging (optional)
app.use((req, res, next) => {
    console.log(req.headers.authorization);
    next();
});

// Set the port from environment variables or default to 5000
const PORT = process.env.PORT || 5000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
