import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
//import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export default function UploadRental() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [type, setType] = useState('');
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handleRentalUpload = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token);
            const owner_id = decoded.id;
            const response = await axios.post('http://localhost:4000/upload-rental', { title, description, location, type, price, owner_id});
            setMessage('Property uploaded successfully');
            setTimeout(() => {
                navigate('/sellet-home');
            }, 1000);
        } catch (error) {
            setError('Upload failed');
        }
    }

    return (
        <div>
            <h1 className="text-3xl font-bold underline">Property Create View</h1>
            {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
            {message && <p className="text-white bg-green-400 p-3 text-sm text-center border rounded">{message}</p>}
            <form className="mb-4" onSubmit={ handleRentalUpload}>
                <div className="form-group">
                    <label for="title">Property Title</label><br/>
                    <input type="text" value={title}  onChange={(e) => setTitle(e.target.value)} id="title" className="" />
                </div>
                <div className="form-group">
                    <label for="description">Property Description</label><br/>
                    <textarea id="description" className="" onChange={(e) => setDescription(e.target.value)} placeholder="property description ...">{ description }</textarea>
                </div>
                <div className="form-group">
                    <label for="location">Property Location</label><br/>
                    <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} id="location" className="" />
                </div>
                <div className="form-group">
                    <label for="type">Property Type</label><br/>
                    <input type="text" id="type" className="" />
                </div>
                <select name="type" id="type" className="" onChange={(e) => setType(e.target.value)}>
                    <option value="">Select Property Type</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                </select>
                <div className="form-group">
                    <label for="price">Property Price</label><br/>
                    <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.price)} className="" />
                </div>
                <button className="">Upload Property</button>
            </form>
        </div>
    )
};