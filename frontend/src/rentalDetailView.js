import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RentalDetailView() {
    const [property, setProperty] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const baseUrl = 'http://localhost:4000';

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`${baseUrl}/rentals/${id}`);
                // const response = await axios.get(`http://localhost:4000/rentals/${id}`);
                setProperty(response.data.rental);
            } catch (error) {
                setError("The property does not exist");
            }
        };
        fetchProperty();
    }, [id, navigate]);

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4 md:px-10">
            <div className="max-w-5xl w-full bg-white shadow-xl rounded-lg overflow-hidden">
                <h1 className="text-4xl font-extrabold text-center py-6 text-gray-800">Property Details</h1>
                {error && (
                    <p className="text-white bg-red-500 p-3 text-sm text-center rounded mb-4">
                        {error}
                    </p>
                )}
                {message && (
                    <p className="text-white bg-green-500 p-3 text-sm text-center rounded mb-4">
                        {message}
                    </p>
                )}
                {property ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
                        <div className="relative">
                            <img
                                src={`http://localhost:4000${property.imageUrl}` || "https://via.placeholder.com/500"}
                                alt={property.title}
                                className="w-full h-96 object-cover rounded-lg shadow-lg"
                            />
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="text-3xl font-semibold mb-3 text-gray-900">{property.title}</h2>
                                <p className="text-gray-600 text-lg">{property.description}</p>
                                <div className="mt-4 space-y-2">
                                    <p className="text-gray-700 text-lg"><strong>📍 Location:</strong> {property.location}</p>
                                    <p className="text-gray-700 text-lg"><strong>🏠 Type:</strong> {property.property_type}</p>
                                    <p className="text-gray-700 text-lg"><strong>💲 Price:</strong> ${property.price}</p>
                                    <p className="text-gray-700 text-lg"><strong>📌 Status:</strong> {property.status}</p>
                                    {/* <p className="text-gray-700 text-lg"><strong>👤 Owner:</strong> {property.owner}</p> */}
                                </div>
                            </div>
                            <button 
                                className="mt-6 bg-red-500 text-white text-lg font-bold py-3 px-6 rounded-lg hover:bg-red-600 transition duration-300 w-full"
                                onClick={() => {
                                    alert("Seller has been contacted");
                                    setMessage("Seller has been contacted");
                                }}
                            >
                                Contact Owner
                            </button>
                        </div>
                    </div>
                ) : (
                    <p className="text-center text-gray-500 py-6 text-lg">Property does not exist.</p>
                )}
            </div>
        </div>
    );
}
