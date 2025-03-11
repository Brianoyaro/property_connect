import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

export default function SellerHome() {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
        const fetchProperties = async () => {
            try {
                const response = await axios.get('http://localhost:4000/rentals');
                setProperties(response.data.rentals);
            } catch (error) {
                setError('Error fetching properties');
            }
        };
        fetchProperties();
    }, [navigate]);

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Seller Dashboard</h1>

            {/* Upload Property Button */}
            <div className="mb-6">
                <Link to="/upload-rental" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    + Upload Property
                </Link>
            </div>

            {/* Error Message */}
            {error && <p className="text-white bg-red-500 p-3 text-center rounded">{error}</p>}

            <h2 className="text-2xl font-semibold text-gray-700 mb-4">My Properties:</h2>

            {/* Properties Grid */}
            {properties.length === 0 ? (
                <p className="text-gray-600">No properties found.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {properties.map((property, index) => (
                        <div key={index} className="bg-white shadow-lg rounded-lg p-4 border">
                            <img 
                                src={`http://localhost:4000${property.imageUrl}` || "https://via.placeholder.com/300"} 
                                alt={property.title} 
                                className="w-full h-48 object-cover rounded-lg"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{property.title}</h3>
                            <p className="text-gray-600">{property.description}</p>
                            <p className="text-gray-500"><strong>Location:</strong> {property.location}</p>
                            <p className="text-gray-500"><strong>Type:</strong> {property.type}</p>
                            <p className="text-gray-700 font-bold text-lg">${property.price}</p>
                            <p className={`font-semibold mt-2 ${property.status === 'available' ? 'text-green-600' : 'text-red-600'}`}>
                                {property.status}
                            </p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
