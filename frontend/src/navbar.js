import React from "react";
import  { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="flex justify-between items-center bg-blue-500 text-white p-4">
            <Link className="navbar-brand" to="/">Property Connect</Link>
            <Link className="nav-link" to="/login">Login</Link>
            <Link className="nav-link" to="/register">Register</Link>
            <button className="" onClick={() => {
                localStorage.removeItem('token');
                localStorage.removeItem('role');
                window.location.href = '/login';
            }}>Logout</button>
        </nav>
    );
}