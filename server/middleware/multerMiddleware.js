const multer = require('multer');
const path = require('path');

// Set up storage for uploaded files (store files on disk)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Specify the folder to save the uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Use a unique filename
  },
});

// Initialize multer with the defined storage
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Error: File type not allowed!'));
    }
  },
});

// Middleware to handle single file uploads
const uploadSingle = upload.single('mediaUrl'); // Ensure the field name matches your form input

module.exports = uploadSingle;
