// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { adminLinks } from '../../Links/Links'; 

const Nft = (props) => {
  // eslint-disable-next-line react/prop-types
  const {  newOrders } = props;
  const history = useHistory()

  const handleClick = () => {
    history.push('/admin/orders'); 
  };

  return (
    <div className="w-full rounded-lg ">
      <div className="flex flex-col gap-4 justify-between pb-12">
        <div className="pb-12 pt-12">
          
          <h5 className="text-gray-600 text-lg font-semibold cursor-pointer" onClick={handleClick}>
           Ordenes Creadas <strong className="font-bold">{newOrders}</strong>
          </h5>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {adminLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className="bg-botonVerde text-white text-xl rounded-lg flex items-center justify-center text-center p-4 ml-1 hover:bg-orange-500 transition-all border border-gray-900"
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

