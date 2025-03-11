import React from "react";
import { Link } from "react-router-dom";

export default function Homepage() {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <header className="bg-blue-600 text-white py-16 text-center">
        <h1 className="text-5xl font-bold">Welcome to Property Connect</h1>
        <p className="mt-4 text-lg">Your ultimate platform to buy, sell, and rent properties seamlessly.</p>
        <div className="mt-6">
          <Link to="/register" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold shadow-md hover:bg-gray-200">Get Started</Link>
        </div>
      </header>
      
      {/* How It Works */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold">How Property Connect Works</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">For Buyers</h3>
            <p>Browse and find the perfect property tailored to your needs.</p>
            <Link to="/buyer-home" className="text-blue-600 mt-2 block">Start Exploring →</Link>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">For Sellers</h3>
            <p>List your property and connect with potential buyers effortlessly.</p>
            <Link to="/seller-home" className="text-blue-600 mt-2 block">List Your Property →</Link>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Safe & Secure</h3>
            <p>We ensure secure transactions and trusted property listings.</p>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="bg-gray-200 py-16 px-8 text-center">
        <h2 className="text-3xl font-bold">What Our Users Say</h2>
        <div className="mt-8">
          <blockquote className="italic">"Property Connect made finding my dream home so easy! Highly recommended." - Jane D.</blockquote>
          <blockquote className="italic mt-4">"I listed my apartment and sold it within a week. Amazing platform!" - Mark T.</blockquote>
        </div>
      </section>
      
      {/* Featured Listings */}
      <section className="py-16 px-8 text-center">
        <h2 className="text-3xl font-bold">Featured Listings</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-8">
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Luxury Villa</h3>
            <p>$500,000 - New York</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Modern Apartment</h3>
            <p>$1,200/month - Los Angeles</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold">Cozy Cottage</h3>
            <p>$250,000 - Texas</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center py-6">
        <p>&copy; 2025 Property Connect. All Rights Reserved.</p>
      </footer>
    </div>
  );
}
