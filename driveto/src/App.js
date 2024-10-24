import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Screens/Home";
import About from "./Screens/About";
import Driver from "./Screens/Driver";
import Login from "./Screens/Login";
import ResetPassword from "./Screens/ResetPassword";
import Cab from './Screens/Cab';
import Transport from './Screens/Transport';
import Rent from './Screens/Rent';
import Book from './Screens/Book';
import Previous_Bookings from './Screens/Previous_Bookings';
import CarRental from './Screens/Rent';
import Luxury from './Screens/Luxury';
import Regular from './Screens/Regular';
import Payment from './Screens/Payment';
import "./App.css";
import RegisterCar from './Screens/RentYourCar'; // Correct import

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/driver" element={<Driver />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cab" element={<Cab/>}/>
        <Route path="/transport" element={<Transport/>}/>
        <Route path="/rentacar" element={<Rent/>}/>
        <Route path="/book" element={<Book/>}/>
        <Route path="/Booking" element={<Previous_Bookings/>}/>
      
      <Route path="/" element={<CarRental />} />
      <Route path="/luxury" element={<Luxury />} />
      <Route path="/regular" element={<Regular />} />
      <Route path="/rent-your-car" element={<RegisterCar/>}/> {/* Use RegisterCar here */}
      <Route path="/payment" element={<Payment/>}/>
    </Routes>
  </Router>
        
      
  );
}

export default App;
