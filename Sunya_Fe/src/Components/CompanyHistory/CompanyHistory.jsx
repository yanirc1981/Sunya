import React from 'react';
import {vacas3 } from '../Image/Image';
import './CompanyHistory.css';


const CompanyHistory = () => {
 
  return (
    <div className="history-section">
      <video className="background-video" autoPlay loop muted>
        <source src={vacas3} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="overlay"></div>
      <div className="content-box">
       
        <p>
        Sunya SAS, Galería del Arte Sano, lugar para arte y espiritualidad, aquí fácilmente se realiza una obra de arte con pensamiento de libertad. Lo importante, creamos una comunidad comprometida con arte sanía. ¡Ven, conoce tu Sunya u origen, será divertido!
        </p>
      </div>
     

     
    </div>
  );
};

export default CompanyHistory;
