import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [role, setRole] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();

        if (password !== password2) {
            setError('Passwords do not match');
            return;
        }
        try {
            await axios.post('http://localhost:4000/register', { email, password, role });
            setMessage('Registration successful');
            // Trigger a slight delay before redirecting to login page
            setTimeout(() => {  
                navigate('/login');
            }, 2000);
            navigate('/login');
        } catch (err) {
            setError('Registration failed');
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-196">
                {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
                {message && <p className="text-white p-3 text-sm text-center bg-green-400 border rounded">{message}</p>}
                <h2 className="text-2xl font-bold text-center mb-3 pt-2">Register</h2>
                <form onSubmit={ handleRegister }>
                    <input type="email" className="w-full p-2 mb-2 border rounded" placeholder="email" required value={ email } onChange={ (e) => setEmail(e.target.value)}/>
                    <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Password" required value={ password } onChange={ (e) => setPassword(e.target.value )}/>
                    <input type="password" className="w-full p-2 mb-2 border rounded" placeholder="Confirm Password" required value={ password2 } onChange={ (e) => setPassword2(e.target.value)}/>
                    <select className="w-full p-2 mb-2 border rounded" required onChange={ (e) => setRole(e.target.value) }>
                        <option value="">Select Role</option>
                        <option value="buyer">Tenant/Buyer</option>
                        <option value="seller">Owner/Seller</option>
                    </select>
                    <button className="w-full bg-blue-500 text-white p-2 rounded">Register</button>
                </form>
                <p className="mt-2">Already have an account? <Link to="/login" className="text-blue-500">Login</Link></p>
            </div>
        </div>
    );
}