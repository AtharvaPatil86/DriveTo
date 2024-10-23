import React from 'react';
import './Regular.css';
import Audi_A6 from '../Images/Audi-A6.webp';
import Audi_Q5 from '../Images/Audi-Q5.jpg';
import BMW_7 from  '../Images/BMW7.webp';
import Jaguar from '../Images/Jaguar-xf.webp';
import E250 from '../Images/Merc-E250.jpeg';
import GLS from '../Images/Mercedes-Benz-GLS.webp';
const carData = [
  { name: 'Mercedes E250', imgSrc: E250 },
  { name: 'BMW 7 Series', imgSrc: BMW_7 },
  { name: 'Audi A6', imgSrc: Audi_A6 },
  { name: 'Jaguar XF', imgSrc: Jaguar },
  { name: 'Mercedes-GLS', imgSrc: GLS },
  { name: 'Audi Q5', imgSrc: Audi_Q5 }
];

const Luxury = () => {
  return (
    <div className="regular-container">
      
      <div className="car-grid">
        {carData.map((car, index) => (
          <div className="car-card" key={index}>
            <img src={car.imgSrc} alt={car.name} className="car-image2" />
            <h2 className="car-name">{car.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Luxury;
