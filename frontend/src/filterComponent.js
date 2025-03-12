import React, { useState } from "react";

export default function FilterSection({ onFilter }) {
    const [location, setLocation] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [propertyType, setPropertyType] = useState("");

    const handleFilter = () => {
        onFilter({ location, minPrice, maxPrice, propertyType });
    };

    return (
        <div className="p-4 bg-gray-100 rounded shadow-md">
            <h2 className="text-xl font-semibold mb-3">Filter Properties</h2>

            <div className="mb-2">
                <label className="block text-sm font-medium">Location:</label>
                <input
                    type="text"
                    className="w-full p-2 border rounded"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                />
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium">Price Range:</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        className="w-1/2 p-2 border rounded"
                        value={minPrice}
                        onChange={(e) => setMinPrice(e.target.value)}
                        placeholder="Min Price"
                    />
                    <input
                        type="number"
                        className="w-1/2 p-2 border rounded"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(e.target.value)}
                        placeholder="Max Price"
                    />
                </div>
            </div>

            <div className="mb-2">
                <label className="block text-sm font-medium">Property Type:</label>
                <select
                    className="w-full p-2 border rounded"
                    value={propertyType}
                    onChange={(e) => setPropertyType(e.target.value)}
                >
                    <option value="">All Types</option>
                    <option value="house">House</option>
                    <option value="apartment">Apartment</option>
                </select>
            </div>

            <button
                onClick={handleFilter}
                className="w-full bg-blue-500 text-white py-2 mt-2 rounded hover:bg-blue-600"
            >
                Apply Filters
            </button>
        </div>
    );
}
