import React from 'react';

const ContactUs = () => {
  return (
    <div className="max-w-3xl mx-auto p-8 bg-primary text-secondary rounded-lg shadow-lg">
      <h1 className="text-5xl font-bold text-center text-gradient mb-6">
        Contact Us! ✨
      </h1>
      <p className="text-xl text-center mb-6">
        We'd love to hear from you, whether you have a question, feedback, or just want to say hello. Our inbox is always open! 😊
      </p>
      <div className="flex justify-center items-center mb-6">
        <a
          href="mailto:adityapatil9537@gmail.com"
          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-500 text-2xl font-semibold transition-transform transform hover:scale-105"
        >
          adityapatil9537@gmail.com
        </a>
      </div>
      <p className="text-center text-lg mb-4">
        Whether it’s a collaboration inquiry, feedback on the blog, or just a friendly message, we are always happy to connect. 💬
      </p>
      <p className="text-center text-lg mb-6">
        We take every message seriously and aim to respond within 24 hours. Your thoughts, questions, and suggestions are important to us! 🕒
      </p>
      <div className="flex justify-center mt-6">
        <p className="text-center text-gray-600 dark:text-gray-400">
          We appreciate you taking the time to reach out, and we look forward to connecting with you soon! 💌
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
