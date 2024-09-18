import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar"; // Import Navbar
import Home from "./Screens/Home"; // Import Home page
import About from "./Screens/About"; // Import About page
import Driver from "./Screens/Driver"; // Import Driver page
import RentYourCar from "./Screens/Rent_yourCar"; // Import Rent Your Car page
import Login from "./Screens/Login"; // Import Login page
import "./App.css";

function App() {
  return (
    <Router>
      {/* Navbar will be displayed on all routes */}
      <Navbar/>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Home />} /> {/* Home page */}
        <Route path="/about" element={<About />} /> {/* About page */}
        <Route path="/driver" element={<Driver />} /> {/* Driver page */}
        <Route path="/rent-your-car" element={<RentYourCar />} /> {/* Rent Your Car page */}
        <Route path="/login" element={<Login />} /> {/* Login page */}
      </Routes>
    </Router>
  );
}

export default App;
