import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/UserContext';
import { toast } from 'react-toastify'; // Import toast
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { Link } from 'react-router-dom'; // Import Link for routing
import LoadingAnimation from '../components/LoadingAnimation'; // Import your LoadingAnimation component

const Signup = () => {
  const { signup } = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // State to manage loading
  const [error, setError] = useState(''); // State for form errors
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Reset error before submission
    setLoading(true); // Set loading to true when submitting

    // Validate form inputs
    if (username.trim() === '') {
      setError('Username is required');
      setLoading(false);
      return;
    }
    if (email.trim() === '') {
      setError('Email is required');
      setLoading(false);
      return;
    }
    // Updated email validation regex
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      // Attempt signup
      await signup(username, email, password);
      toast.success('Signup successful!'); // Show success toast
      navigate('/'); // Navigate to the home page after successful signup
    } catch (error) {
      toast.error('Signup failed. Please try again.'); // Show error toast if signup fails
      console.error('Signup failed:', error);
    } finally {
      setLoading(false); // Set loading to false once the signup attempt is completed
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 transition-all duration-300">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg dark:bg-gray-800 dark:shadow-xl">
        <h2 className="text-3xl font-semibold text-center text-gray-700 dark:text-gray-300 mb-6">
          Create Your Account
        </h2>

        {/* Display error message */}
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <form onSubmit={handleSubmit} className="mt-6 space-y-6">
          <div className="mb-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 transition-all duration-300"
            />
          </div>
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 transition-all duration-300"
            />
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
              'Sign Up'
            )}
          </button>
        </form>

        <div className="flex justify-between items-center mt-6 space-x-4">
          <hr className="w-full border-gray-300 dark:border-gray-600" />
          <span className="text-gray-600 dark:text-gray-400">or</span>
          <hr className="w-full border-gray-300 dark:border-gray-600" />
        </div>

        <p className="mt-4 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
