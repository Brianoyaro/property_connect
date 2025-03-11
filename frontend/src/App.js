import React from 'react';
import Navbar from './navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Homepage from './homepage';

function App() {
  // return (
  //   <Fragment>
  //     <h1 className="text-3xl font-bold underline">Property Connect App</h1>
  //   </Fragment>
  // );
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/seller-home" element={<h1>Seller Home</h1>} />
          <Route path="/buyer-home" element={<h1>Buyer Home</h1>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/logout" element={<h1>Logout</h1>} />
          <Route path="/rentals" element={<h1>Property list view</h1>} />
          <Route path="/rentals/new" element={<h1>Property create view</h1>} />
          <Route path="/rentals/:id" element={<h1>Property detail view</h1>} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
