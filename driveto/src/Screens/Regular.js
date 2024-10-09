import React from 'react';
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
  { name: 'Ciaz', imgSrc: '/path-to-car6.jpg' },
  { name: 'Vento', imgSrc: '/path-to-car7.jpg' },
  { name: 'Rapid', imgSrc: '/path-to-car8.jpg' },
  { name: 'Corolla', imgSrc: '/path-to-car9.jpg' },
  { name: 'Creta', imgSrc: '/path-to-car10.jpg' },
  { name: 'Ertiga', imgSrc: '/path-to-car11.jpg' },
  { name: 'Innova', imgSrc: '/path-to-car12.jpg' },
  { name: 'Scorpio', imgSrc: '/path-to-car13.jpg' },
  { name: 'Fortuner', imgSrc: '/path-to-car14.jpg' },
  { name: 'Tavera', imgSrc: '/path-to-car15.jpg' }
];

const Regular = () => {
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

export default Regular;
