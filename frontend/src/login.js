import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
 

  useEffect(() => {
    // Check if the user is already logged in
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');
    if (token) {
        navigate(role === 'seller' ? '/seller-home' : '/buyer-home');
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/login', { email, password });
      console.log(response)
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
      setMessage('Login successful');
      //navigate('/');
      setTimeout(() => {
        navigate(response.data.role === 'seller' ? '/seller-home' : '/buyer-home');
      }, 1000);
      // navigate(response.data.role === 'seller' ? '/seller-home' : '/buyer-home');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-196">
        {error && <p className="text-white p-3 text-sm text-center bg-red-400 border rounded">{error}</p>}
        {message && <p className="text-white p-3 text-sm text-center bg-green-400 border rounded">{message}</p>}
        <h2 className="text-2xl font-bold text-center mb-3 pt-2">Login</h2>
        <form onSubmit={handleLogin}>
          <input type="email" className="w-full p-2 mb-2 border rounded" placeholder="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
        </form>
        <p className="mt-2">Need an account? <Link to="/register" className="text-blue-500">Register</Link></p>
      </div>
    </div>
  );
};

export default Login;
