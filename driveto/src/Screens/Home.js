import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '../Components/Navbar';
import Options from '../Components/Options';
import Logo from '../Images/Logo.jpeg';
import './Home.css';


export default function Home() {
  return (
    <>
    
       <div className= "container-fluid text-center title1">
      
        
      <div className="row justify-content-center align-items-center mt-5">
        <div className="col-md-auto">
          
          <img src={Logo} alt="DriveTo Logo" className="img-fluid" style={{ width: '200px', height: '175px' }}/>
        </div>
        {/* <div className="col-md-auto">
          <h1>DriveTo</h1>
        </div> */}
      </div>
    </div>
    
     <Options></Options>
    </>
  )
}
