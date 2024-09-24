import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Screens/Home";
import About from "./Screens/About";
import Driver from "./Screens/Driver";
import RentYourCar from "./Screens/Rent_yourCar";
import Login from "./Screens/Login";
import ResetPassword from "./Screens/ResetPassword";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/rent-your-car" element={<RentYourCar />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
