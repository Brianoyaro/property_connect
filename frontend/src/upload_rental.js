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
    const [imageUrl, setImageUrl] = useState(null);
    const [price, setPrice] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:4000';

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

            // because we are sending file, we should use form-data
            const formData = new FormData();
            formData.append('title', title);
            formData.append('description', description);
            formData.append('location', location);
            formData.append('property_type', type);
            formData.append('price', price);
            formData.append('owner_id', owner_id);
            if (imageUrl) formData.append('image', imageUrl);
            // should be property_type instead of type. Why is price saving NULL?
            await axios.post(`${baseUrl}/upload-rental`, formData, {headers: {'Content-Type': 'multipart/form-data'}});
            // await axios.post('http://localhost:4000/upload-rental', formData, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data'}  
            //     });
            setMessage('Property uploaded successfully');
            setTimeout(() => {
                navigate('/seller-home');
            }, 1000);
        } catch (error) {
            console.log(error)
            setError('Upload failed. Please try again.');
        }
    };
    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Upload a Property</h1>
            {error && <p className="bg-red-500 text-white p-2 text-sm text-center rounded">{error}</p>}
            {message && <p className="bg-green-500 text-white p-2 text-sm text-center rounded">{message}</p>}
            <form className="space-y-4" onSubmit={handleRentalUpload}>
                <div>
                    <input type="file" id="image" onChange={(e) => setImageUrl(e.target.files[0])} className="hidden" />
                    <label htmlFor="image" className="block text-gray-700 font-semibold cursor-pointer">
                        <span className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                            Upload Property Image
                        </span>
                    </label>
                </div>
                <div>
                    <label htmlFor="title" className="block text-gray-700 font-semibold">Property Title</label>
                    <input type="text" id="title" value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        className="w-full p-2 border rounded"
                        required />
                </div>
                <div>
                    <label htmlFor="description" className="block text-gray-700 font-semibold">Property Description</label>
                    <textarea id="description" value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        placeholder="Write a brief description..." 
                        required />
                </div>
                <div>
                    <label htmlFor="location" className="block text-gray-700 font-semibold">Property Location</label>
                    <input type="text" id="location" value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        required />
                </div>
                <div>
                    <label htmlFor="type" className="block text-gray-700 font-semibold">Property Type</label>
                    <select id="type" value={type} onChange={(e) => setType(e.target.value)} 
                        className="w-full p-2 border rounded" required>
                        <option value="">Select Property Type</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="price" className="block text-gray-700 font-semibold">Property Price ($)</label>
                    <input type="number" id="price" value={price} 
                        onChange={(e) => setPrice(e.target.value)} 
                        className="w-full p-2 border rounded" 
                        required />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition">
                    Upload Property
                </button>
            </form>
        </div>
    );
};