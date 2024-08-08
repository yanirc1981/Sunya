import { useState } from 'react';
import { FaToggleOff, FaToggleOn } from 'react-icons/fa';
import './ToggleButton.css';

const ToggleButton = ({status}) => {
  const [isActive, setIsActive] = useState(true);
  

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className={`toggle-button ${status ? 'active' : 'inactive'}`}
      onClick={handleClick}
      title={status ? 'Activo' : 'Inactivo'}
    >
      {status ? <FaToggleOn /> : <FaToggleOff />}
    </button>
  );
};

export default ToggleButton;
