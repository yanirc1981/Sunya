import React from 'react';
import './TiendaOnLineIcon.css';
import { Link } from 'react-router-dom';
import { cart2 } from '../Image/Image'; // Asegúrate de tener esta imagen en la carpeta adecuada

const TiendaOnLineIcon = () => {
  return (
    <div className="tienda-online-icon">
      
      <Link to="/products" >
        <div>
          <img src={cart2} alt="Tienda Online" className="tienda-image" />
        </div>
      </Link>
      <h5 className="p_banner">TIENDA <br/>ONLINE</h5>
    </div>
  );
};

export default TiendaOnLineIcon;
