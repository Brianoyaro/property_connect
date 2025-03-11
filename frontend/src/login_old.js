import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Login</h1>
            <form className="mb-4">
                <div className="form-group">
                    <label for="email">Email</label><br/>
                    <input type="email" id="email" className="" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label><br />
                    <input type="password" id="password" className="" />
                </div>
                <button className="">Login</button>
            </form>
            <p className="mb-2"><Link to="#">Forgot Password?</Link></p>
            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    );
}