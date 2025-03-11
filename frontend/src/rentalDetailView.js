import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function RentalDetailView() {
    const [property, setProperty] = useState(null);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
        }
        const fetchProperty = async () => {
            try {
                const response = await axios.get(`http://localhost:4000/rentals/${id}`);
                setProperty(response.data.rental);
            } catch (error) {
                setError("The property does not exist");
            }
        };
        fetchProperty();
    }, [id, navigate]);

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-center mb-6">Property Detail View</h1>
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h2 className="text-2xl font-bold mb-2">{property.title}</h2>
                        <p className="text-gray-700">{property.description}</p>
                        <p className="text-gray-600 mt-2">Location: <span className="font-semibold">{property.location}</span></p>
                        <p className="text-gray-600">Type: <span className="font-semibold">{property.type}</span></p>
                        <p className="text-gray-600">Price: <span className="font-semibold">${property.price}</span></p>
                        <p className="text-gray-600">Status: <span className="font-semibold">{property.status}</span></p>
                        <p className="text-gray-600">Owner: <span className="font-semibold">{property.owner}</span></p>
                    </div>
                    <div className="flex justify-center items-center">
                        <button 
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
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
                <p className="text-center text-gray-500">Property does not exist.</p>
            )}
        </div>
    );
}
