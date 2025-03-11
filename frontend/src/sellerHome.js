import React from "react";
import { Link } from "react-router-dom";

const [properties, setProperties] = useState([]);
const [error, setError] = useState('');
const [message, setMessage] = useState('');

useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
        navigate('/login');
    }
    const fetchProperties = async () => {
        try {
            const response = await axios.get('http://localhost:4000/properties');
            setProperties(response.data);
        } catch (error) {
            setError('Error fetching properties');
        }
    }
    fetchProperties();
}, [navigate]);


export default function SellerHome() {
    return (
        <div>
            <h1 className="text-3xl font-bold underline">Seller Home</h1>
            <p className='text-3xl font-bold underline'>My properties:</p>
            {error && <p className="text-white bg-red-400 p-3 text-sm text-center border rounded">{error}</p>}
            {message && <p className="text-white bg-green-400 p-3 text-sm text-center border rounded">{message}</p>}
            <p><Link to='/upload-rental' className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Upload Property</Link></p><br />
            { properties && properties.length === 0 ? <p>No properties found</p> :
            properties.map((property, index) => (
                <div key={index}>
                    <h2 className="text-xl font-bold">{property.title}</h2>
                    <p>{property.description}</p>
                    <p>{property.location}</p>
                    <p>{property.type}</p>
                    <p>${property.price}</p>
                    <p>{property.status}</p>
                </div>
            ))}
        </div>
    );
}
// Compare this snippet from frontend/src/register.js: