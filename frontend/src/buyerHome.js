import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export default function BuyerHome() {
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
        }
        fetchProperties();
    }, [navigate]);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-4xl font-bold text-center mb-6">Buyer Home</h1>
            
            {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
            
            <p className="text-lg font-semibold mb-4">Filter Section</p>

            {properties.length === 0 ? (
                <p className="text-center text-gray-600">No properties found</p>
            ) : (
                <>
                    <h2 className="text-3xl font-bold mb-4">Properties for Sale/Rent</h2>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {properties.map((property) => (
                            <Link to={`/rentals/${property.id}`} key={property.id} className="block">
                                <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                                    <img 
                                        src={`http://localhost:4000${property.imageUrl}`|| "https://via.placeholder.com/300"} 
                                        alt={property.title} 
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="p-4">
                                        <h3 className="text-lg font-bold mb-2">{property.title}</h3>
                                        <p className="text-gray-700">{property.location}</p>
                                        <p className="text-gray-600">{property.type}</p>
                                        <p className="text-gray-800 font-semibold">${property.price}</p>
                                        <p className={`text-sm font-medium ${property.status === 'available' ? 'text-green-500' : 'text-red-500'}`}>
                                            {property.status}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}
