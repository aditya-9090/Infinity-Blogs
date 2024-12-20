const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    mediaUrl: {
        type: String,
    },
    category: {
        type: String,
    },
    
    tags: {
        type: [String],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
}, { timestamps: true });

module.exports = mongoose.model('Blog', blogSchema);
