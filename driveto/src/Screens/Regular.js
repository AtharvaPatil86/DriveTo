import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import './Regular.css'; // Add your custom CSS here
import Swift from '../Images/swift.webp';
import WagonR from '../Images/WagonR.jpg';
import Polo from '../Images/polo.webp';
import Figo from '../Images/figo.webp';
import City from '../Images/city.webp';
import Ciaz from '../Images/ciaz.webp';
import Vento from '../Images/vento.jpg';
import Rapid from '../Images/rapid.JPG';
import Corolla from '../Images/corolla.webp';
import Creta from '../Images/Creta.jpg';
import Ertiga from '../Images/ertiga.jpg';
import Innova from '../Images/innova.jpeg';
import Scorpio from '../Images/scorpio.jpg';
import Fortuner from '../Images/fortuner.jpg';
import Tavera from '../Images/tavera.jpeg';

const carData = [
  { name: 'Swift', imgSrc: Swift },
  { name: 'WagonR', imgSrc: WagonR },
  { name: 'Polo', imgSrc: Polo },
  { name: 'Figo', imgSrc: Figo },
  { name: 'City', imgSrc: City },
  { name: 'Ciaz', imgSrc: Ciaz },
  { name: 'Vento', imgSrc: Vento },
  { name: 'Rapid', imgSrc: Rapid },
  { name: 'Corolla', imgSrc: Corolla },
  { name: 'Creta', imgSrc: Creta },
  { name: 'Ertiga', imgSrc: Ertiga },
  { name: 'Innova', imgSrc: Innova },
  { name: 'Scorpio', imgSrc: Scorpio },
  { name: 'Fortuner', imgSrc: Fortuner },
  { name: 'Tavera', imgSrc: Tavera }
];

const Regular = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Function to handle car click and navigate to booking page
  const handleCarClick = (carName) => {
    navigate(`/booking/${carName}`); // Navigate to booking page with car name in the URL
  };

  return (
    <div className="regular-container">
      <div className="car-grid">
        {carData.map((car, index) => (
          <div
            className="car-card"
            key={index}
            onClick={() => handleCarClick(car.name)} // Call handleCarClick when a car is clicked
            style={{ cursor: 'pointer' }} // Change the cursor to pointer to indicate it's clickable
          >
            <img src={car.imgSrc} alt={car.name} className="car-image2" />
            <h2 className="car-name">{car.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Regular;
