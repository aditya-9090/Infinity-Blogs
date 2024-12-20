import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserProvider from "./contexts/UserContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar"; // Import your Navbar component
import Home from "./pages/Home";
import { BlogProvider } from "./contexts/BlogContext";
import AboutUs from "./pages/AboutUs";
import MyBlogs from "./pages/MyBlogs";
import CreateBlog from "./pages/CreateBlog";
import BlogDetails from "./pages/BlogDetails";
import UpdateBlog from "./pages/UpdateBlog";

// Import ToastContainer from react-toastify
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast CSS
import Footer from "./components/Footer";
import ContactUs from "./pages/ContactUs";

const App = () => {
  return (
    <UserProvider>
      <BlogProvider>
        <Router>
          <Navbar />
          <div className="pt-20">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about-us" element={<AboutUs />} />
              <Route path="/my-blogs" element={<MyBlogs />} />
              <Route path="/create-blog" element={<CreateBlog />} />
              <Route path="/blogs/:id" element={<BlogDetails />} />
              <Route path="/update-blog/:id" element={<UpdateBlog />} />
              <Route path="/contact-us" element={<ContactUs />} />

            </Routes>
            {/* Add the ToastContainer here to render toasts */}
            <ToastContainer position="top-center" />
          </div>
          <Footer/>
        </Router>
      </BlogProvider>
    </UserProvider>
  );
};

export default App;
