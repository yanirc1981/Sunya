import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { adminLinks } from '../../Links/Links'; // Asumiendo que adminLinks es un array de objetos con icon, text y path
import './nft.css';

const Nft = (props) => {
  const { name, newOrders } = props;
  const history = useHistory()

  const handleClick = () => {
    history.push('/admin/orders'); 
  };

  return (
    <div className="col-12 rounded-box bg-blue nft-square">
      <div className="d-flex flex-column gap-3 justify-content-between">
        <div>
          <h5 className="text-black title-nft">Hola {name}</h5>
          <h5 className="text-black title-nft" onClick={handleClick}>
            Pedidos nuevos <strong className="strong_nft">{newOrders}</strong>
          </h5>
        </div>
        <div className="d-flex justify-content-center flex-wrap">
          {adminLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="card bg-dark-blue text-black item-collection-button d-flex align-items-center m-2"
            >
              <div className="card-body d-flex align-items-center">
                <p className="icon-image">{link.icon}</p>
                <p className="ms-4">{link.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Nft;
