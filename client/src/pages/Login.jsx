import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom'; // Import Link for routing
import LoadingAnimation from '../components/LoadingAnimation'; // Import your LoadingAnimation component

const Login = () => {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const [emailError, setEmailError] = useState(''); // State for email validation error
  const navigate = useNavigate();

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex for validating email format

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when submitting

    // Email validation check
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      setLoading(false); // Set loading to false when validation fails
      return;
    } else {
      setEmailError(''); // Clear any previous email validation error
    }

    try {
      // Attempt login
      await login(email, password);
      toast.success('Login successful!');
      navigate('/'); // Redirect to homepage
    } catch (error) {
      toast.error(error.message); // Show the error message returned by the backend
      console.error('Login error:', error.message);
    } finally {
      setLoading(false); // Set loading to false once login attempt is completed
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
          Welcome Back!
        </h2>
        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 transition-all duration-300"
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>} {/* Display email validation error */}
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={loading} // Disable button while loading
            className={`w-full p-4 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200 ease-in-out transform hover:scale-105 dark:bg-blue-500 dark:hover:bg-blue-600 ${loading ? 'cursor-wait' : ''}`}
          >
            {loading ? (
              <div className="flex justify-center">
                <LoadingAnimation /> {/* Display your custom loading animation */}
              </div>
            ) : (
              'Log In'
            )}
          </button>
        </form>
        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 hover:underline dark:text-blue-400">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
