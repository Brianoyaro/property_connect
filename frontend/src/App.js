import React from 'react';
import Navbar from './navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './login';
import Register from './register';
import Homepage from './homepage';
import UploadRental from './upload_rental';
import RentalDetailView from './rentalDetailView';
import SellerHome from './sellerHome';
import BuyerHome from './buyerHome';

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
          <Route path="/seller-home" element={<SellerHome />} />
          <Route path="/buyer-home" element={<BuyerHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rentals" element={<h1>Property list view</h1>} />
          <Route path="/rentals/:id" element={<RentalDetailView />} />
          <Route path="/upload-rental" element={<UploadRental />} /> 
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;
