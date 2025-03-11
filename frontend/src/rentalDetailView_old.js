import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


export default function RentalDetailView() {

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
                setProperty(response.data.rental);
            } catch (error) {
                setError('The property does not exist');
            }
        }
        fetchProperty();
    }, [navigate]);
    
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Property Detail View</h1>
            <div className="mb-4">
                {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
                {message && <p className="text-white bg-green-400 p-3 text-sm text-center border rounded">{message}</p>}
                {property && Object.entries(property).length === 0 ? <p>Property does not exist.</p> :
                <div>
                    <h2 className="text-xl font-bold">{property.title}</h2>
                    <p>{property.description}</p>
                    <p>Location: {property.location}</p>
                    <p>Type: {property.type}</p>
                    <p>$ {property.price}</p>
                    <p>Status: {property.status}</p>
                    <p>Owner: {property.owner}</p>
                    <button className="" onClick={() => {
                        alert('seller has been contacted')
                        setMessage('Seller has been contacted');
                    }
                    }>Contact Owner</button>
                </div>
                }
            </div>
        </div>
    );
}