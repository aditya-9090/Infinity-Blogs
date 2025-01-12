# MERN Blog Application 🌐

A simple and powerful blog application built with the MERN stack, enabling users to create, read, update, and delete blog posts, with additional features like image uploads and filtering.

---

## Features

- **User Authentication**: Secure login and registration using JWT.
- **Blog Management**: Create, edit, delete, and view blog posts.
- **Image Uploads**: Integrated with Cloudinary for image hosting.
- **Search and Filter**: Find blogs by keywords or categories.
- **Responsive Design**: Styled with Tailwind CSS.

---

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express.js, MongoDB
- **Utilities**: Axios, Cloudinary, Multer

---

## Steps to Clone and Setup

Follow the steps below to set up the project on your local machine:

### 1. Clone the Repository
   - Open your terminal and run:
     ```bash
     git clone https://github.com/aditya-9090/Infinity-Blogs.git
     cd blog-app
     ```

### 2. Backend Setup
   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     CLOUDINARY_CLOUD_NAME=your_cloud_name
     CLOUDINARY_API_KEY=your_api_key
     CLOUDINARY_API_SECRET=your_api_secret
     JWT_SECRET=your_jwt_secret_key
     ```
   - Start the backend server:
     ```bash
     npm start
     ```

### 3. Frontend Setup
   - Navigate to the `frontend` directory:
     ```bash
     cd ../frontend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the frontend development server:
     ```bash
     npm run dev
     ```



