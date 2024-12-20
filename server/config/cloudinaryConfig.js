// config/cloudinaryConfig.js
const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to check Cloudinary connection
const checkCloudinaryConnection = () => {
  cloudinary.api.ping((error, response) => {
    if (error) {
      console.error("Failed to connect to Cloudinary:", error);
    } else {
      console.log("Cloudinary connected successfully:", response.status); // Expected status: 200
    }
  });
};

// Call the connection check immediately
checkCloudinaryConnection();

module.exports = cloudinary;
