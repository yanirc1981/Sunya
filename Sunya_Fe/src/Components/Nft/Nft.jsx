// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { adminLinks } from '../../Links/Links'; // Asumiendo que adminLinks es un array de objetos con icon, text y path

const Nft = (props) => {
  // eslint-disable-next-line react/prop-types
  const { name, newOrders } = props;
  const history = useHistory()

  const handleClick = () => {
    history.push('/admin/orders'); 
  };

  return (
    <div className="w-full rounded-lg bg-fondoAmarillo p-8">
      <div className="flex flex-col gap-4 justify-between">
        <div>
          <h5 className="text-black text-xl font-semibold">HOLA {name}</h5>
          <h5 className="text-black text-lg font-semibold cursor-pointer" onClick={handleClick}>
            Pedidos nuevos <strong className="font-bold">{newOrders}</strong>
          </h5>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {adminLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-botonVerde text-white text-xl rounded-lg flex items-center justify-center text-center p-4 m-2 hover:bg-orange-500 transition-all border border-gray-500"
            >
              <div className="flex items-center">
                <p className="text-xl">{link.icon}</p>
                <p className="ml-8">{link.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}  

export default Nft;

