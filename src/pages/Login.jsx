import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Update import
import { useToasts } from 'react-toast-notifications';
import { useDispatch } from 'react-redux';
import { loginSuccess, setTodoList, setUser } from '../redux/actions/authActions';
const url = "https://technical-brittaney-sitrc-bdf3a6c7.koyeb.app";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToasts();
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Correct import

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${url}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.status === 200) {
        const data = await response.json();
        dispatch(loginSuccess(data.access_token));
        // console.log(data.access_token);
        const response2 = await fetch(`${url}/api/auth/user`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${data.access_token}`
          }
        });
        const data2 = await response2.json();
        // console.log(data2.username);
        dispatch(setUser(data2.username));
        navigate('/home');
      } else if (response.status === 401) {
        addToast('Incorrect password. Please try again.', { appearance: 'error' });
      } else if (response.status === 404) {
        addToast('Email does not exist.', { appearance: 'error' });
      } else {
        addToast('Login failed. Please try again later.', { appearance: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      addToast('Login failed. Please try again later.', { appearance: 'error' });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex h-screen bg-gray-900">
      <div className="w-2/3 bg-gray-800 flex justify-center items-center">
        <div className="max-w-lg p-8 text-white">
          <h2 className="text-4xl font-bold mb-8">Welcome to Listify!</h2>
          <p className="text-lg mb-4">
            Listify helps you organize your tasks and make your life easier. Create your own
            personalized to-do list, add tasks, and track your progress easily.
          </p>
          <p className="text-lg">
            With Listify, managing tasks has never been simpler. Get started today and make your
            tasks more manageable!
          </p>
        </div>
      </div>
      <div className="w-1/3 flex justify-center items-center">
        {/* Right part with login form */}
        <div className="p-8 rounded w-full max-w-md text-white">
          <h2 className="text-4xl font-bold mb-8 text-center">Login</h2>
          <label htmlFor="email" className="block text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none px-3 py-2 bg-gray-700 text-white"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <label htmlFor="password" className="block text-sm font-medium mt-4">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              className="mt-1 block w-full rounded-md border-gray-700 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 focus:ring-opacity-50 focus:outline-none px-3 py-2 bg-gray-700 text-white"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 focus:outline-none"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 8.293a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM10 13a1 1 0 100-2 1 1 0 000 2zm7-7a1 1 0 010 2H3a1 1 0 010-2h14z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M17.707 8.293a1 1 0 010 1.414l-1.414 1.414a1 1 0 01-1.414-1.414l1.414-1.414a1 1 0 011.414 0zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                  <path
                    fillRule="evenodd"
                    d="M3.293 6.293a1 1 0 011.414 0l12 12a1 1 0 01-1.414 1.414l-12-12a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="bg-indigo-500 text-white py-2 px-4 rounded focus:outline-none focus:bg-indigo-600 w-full mt-6"
            onClick={handleSubmit}
          >
            Sign In
          </button>
          <div className="text-center mt-4">
            <span className="text-gray-400">Don't have an account?</span>{' '}
            <Link to="/register" className="text-indigo-400 hover:text-indigo-300">
              Register here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
