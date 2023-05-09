import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingBar from './Loadingbar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  function login() {
    setLoading(true);
    axios.post('http://localhost:5000/api/user/login', {

      'email': email,
      'password': password
    }).then((res) => {
      setLoading(false);
      if (res.status === 200) {
        console.log(res.data);
        localStorage.setItem('socialmediauser', JSON.stringify(res.data));
        navigate('/');
      }
      else {
        alert("error");
      }
    });
  }
  return (
    <>
      {loading && <LoadingBar />}
      <div className="bg-gradient-to-r py-5 from-purple-400 via-pink-500 to-red-500 min-h-screen flex items-center justify-center">
        <div className="bg-white w-full max-w-sm rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4">
            <h2 className="text-center text-3xl font-bold text-gray-700">Sign in to your account</h2>
          </div>
          <div className="px-6 py-4">

            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                
                onClick={(e) => {
                 e.preventDefault();
                  login();
                }}
              >
                Sign In
              </button>
              <Link
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                to="#"
              >
                Forgot Password?
              </Link>
            </div>
          </div>
          <div className="px-6 py-4">
            <p className="text-gray-700 text-center">
              Don't have an account?{' '}
              <Link className="font-bold text-blue-500 hover:text-blue-800" to="/signup">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;