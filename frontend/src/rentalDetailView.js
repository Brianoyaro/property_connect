import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


const [property, setProperty] = useState({});
const [error, setError] = useState('');
const [message, setMessage] = useState('');
const id = useParams().id;

const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
    }
    const fetchProperty = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/rentals/${id}`);
            setProperty(response.data);
        } catch (error) {
            setError('Error fetching property');
        }
    }
    fetchProperty();
}, [navigate]);

export default function RentalDetailView() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Property Detail View</h1>
            <div className="mb-4">
                {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
                {message && <p className="text-white bg-green-400 p-3 text-sm text-center border rounded">{message}</p>}
                {property && 
                <div>
                    <h2 className="text-xl font-bold">{property.title}</h2>
                    <p>{property.description}</p>
                    <p>{property.location}</p>
                    <p>{property.type}</p>
                    <p>${property.price}</p>
                    <p>{property.status}</p>
                    <p>{property.owner}</p>
                </div>
                }
                {/* <h2 className="text-xl font-bold">Property Name</h2>
                <p>Property Image</p>
                <p>Property Title</p>
                <p>Property Description</p>
                <p>Property Location</p>
                <p>Property Type</p>
                <p>$: Property Price</p>
                <p>Property Status</p>
                <p>Property Owner</p> */}
            </div>
            <button className="" onClick={() => {
                alert('seller has been contacted')
                setMessage('Seller has been contacted');
            }
            }>Contact Owner</button>
        </div>
    );
}