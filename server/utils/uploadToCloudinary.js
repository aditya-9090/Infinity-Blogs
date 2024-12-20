const cloudinary = require('cloudinary').v2;

// Function to upload a file path to Cloudinary
const uploadToCloudinary = async (filePath) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(filePath, { resource_type: 'image' }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result.secure_url);
            }
        });
    });
};

module.exports = uploadToCloudinary;
