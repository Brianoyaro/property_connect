import React, { useEffect, useState } from "react";
import  { Link } from "react-router-dom";

export default function Navbar() {
    const [role, setRole] = useState('');
    useEffect(() => {
        const role = localStorage.getItem('role');
        setRole(role);
    }
    , []);

    return (
        <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
            <Link className="navbar-brand" to="/">Property Connect</Link>
            {role === 'buyer' && 
                <>
                    <Link className="nav-link" to="/buyer-home">Home</Link>
                </>
            }
            {role === 'seller' && 
                <>
                    <Link className="nav-link" to="/seller-home">Home</Link>
                </>
            }
            {role === '' &&
                <>
                    <Link className="nav-link" to="/login">Login</Link>
                    <Link className="nav-link" to="/register">Register</Link>
                </>
            }
            {role !== '' &&
                <button className="" onClick={() => {
                    localStorage.removeItem('token');
                    localStorage.removeItem('role');
                    window.location.href = '/login';
                }}>Logout</button>
            }
        </nav>
    );
}