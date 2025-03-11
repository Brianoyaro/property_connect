import React from "react";
import { Link } from "react-router-dom";

export default function Register() {
    return (
        <div className="container">
            <h1 className="text-3xl font-bold underline">Register</h1>
            <form className="mb-4">
                <div className="form-group">
                    <label for="email">Email</label><br />
                    <input type="email" id="email" className="" />
                </div>
                <div className="form-group">
                    <label for="password">Password</label><br />
                    <input type="password" id="password" className="" />
                </div>
                <div className="form-group">
                    <label for="password2">Confirm Password</label><br />
                    <input type="password" id="password2" className="" />
                </div>
                <button className="btn btn-primary">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login</Link></p>
        </div>
    );
}