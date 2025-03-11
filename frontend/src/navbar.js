import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
    const [role, setRole] = useState('');
    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const storedRole = localStorage.getItem('role');
        setRole(storedRole || '');
    }, []);

    const handleLogout = () => {
        if (window.confirm("Are you sure you want to log out?")) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            window.location.href = '/login';
        }
    };

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-md flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">Property Connect</Link>
            
            {/* Mobile Menu Button */}
            <button 
                className="md:hidden text-white text-2xl focus:outline-none" 
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? '✖' : '☰'}
            </button>

            {/* Navigation Links */}
            <div className={`md:flex gap-6 ${menuOpen ? 'block' : 'hidden'} md:block`}>
                {role === 'buyer' && (
                    <Link to="/buyer-home" className={`hover:text-gray-200 ${location.pathname === '/buyer-home' ? 'underline' : ''}`}>Home</Link>
                )}
                {role === 'seller' && (
                    <>
                        <Link to="/seller-home" className={`hover:text-gray-200 ${location.pathname === '/seller-home' ? 'underline' : ''}`}>Dashboard</Link>
                        <Link to="/upload-rental" className={`hover:text-gray-200 ${location.pathname === '/upload-rental' ? 'underline' : ''}`}>Upload Property</Link>
                    </>
                )}
                {role === '' && (
                    <>
                        <Link to="/login" className="hover:text-gray-200">Login</Link>
                        <Link to="/register" className="hover:text-gray-200">Register</Link>
                    </>
                )}
                {role !== '' && (
                    <button onClick={handleLogout} className="bg-red-500 px-3 py-1 rounded-md hover:bg-red-700">Logout</button>
                )}
            </div>
        </nav>
    );
}
