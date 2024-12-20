import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; // Correctly import jwtDecode
import api from "../services/api"; // Ensure the api service is correctly set up

// Create the UserContext
export const UserContext = createContext();

// Create the UserProvider component
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const isLoggedIn = Boolean(user); // Determine if the user is logged in based on user state

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwtDecode(token); // Decode token to get user data
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token");
        localStorage.removeItem("token"); // Clear invalid token
      }
    }
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/users/login", { email, password });
      const token = response.data.token;

      // Save token in localStorage
      localStorage.setItem("token", token);

      // Decode token to get user details
      const decodedUser = jwtDecode(token);
      setUser(decodedUser);

      return response.data; // Return response for additional usage
    } catch (error) {
      // Handle validation and server errors
      if (error.response) {
        const status = error.response.status;

        if (status === 400) {
          // Validation errors
          const validationErrors = error.response.data.errors || [];
          const errorMessage = validationErrors
            .map((err) => err.msg)
            .join(", ");
          throw new Error(errorMessage);
        } else if (status === 401) {
          throw new Error("Invalid credentials");
        }
      }
      throw new Error("Something went wrong. Please try again.");
    }
  };

  const signup = async (username, email, password) => {
    try {
      await api.post("/users/register", { username, email, password });
      login(email, password); // Log in the user after signing up
    } catch (error) {
      console.error("Signup failed", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Clear user state
  };

  return (
    <UserContext.Provider value={{ user, isLoggedIn, login, signup, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider; // Default export for UserProvider
