import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
//import { navigate } from "react-router-dom";

const [properties, setProperties] = useState([]);
const [error, setError] = useState('');
const [message, setMessage] = useState('');
const navigate = useNavigate();

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
    }
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:4000/rentals');
            setProperties(response.rentals);
        } catch (error) {
            setError('Error fetching properties');
        }
    }
    fetchProperties();
}, [navigate]);

export default function BuyerHome() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Buyer Home</h1>
            {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
            {message && <p className="text-white bg-green-400 p-3 text-sm text-center border rounded">{message}</p>}
            {/ add a filer functionality /}

            { properties && properties.length === 0 ? <p>No properties found</p> :
            <>
            <p className='text-3xl font-bold underline'>Properties for sale/rental:</p>
            {properties.map((property, index) => (
                <Link to={`/rentals/${property.id}`} key={index}>
                <div>
                    <h2 className="text-xl font-bold">{property.title}</h2>
                    <p>{property.description}</p>
                    <p>{property.location}</p>
                    <p>{property.type}</p>
                    <p>${property.price}</p>
                    <p>{property.status}</p>
                </div>
            </Link>
            ))}
            </>
            }
            <button className="" onClick={() => {
                alert('seller has been conatcted')
                setMessage('Seller has been contacted');
            }
            }>Contact Owner</button>
        </div>
    );
}