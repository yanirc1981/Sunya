import React, { useState } from 'react';
import './CompanyMissionVision.css';

const CompanyMissionVision = () => {
  const [selected, setSelected] = useState('vision');

  const handleRadioChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <div className="mission-vision">
      <div className="overlay"></div>
      <div className="content-box">
        <h2 className='tittle-mision-vision'>{selected === 'vision' ? 'Visión' : 'Misión'}</h2>
        <p>
          {selected === 'vision'
            ? 'Ser líderes en el mercado de la región, reconocidos por nuestra excelencia en servicio y nuestro compromiso con la sostenibilidad y la innovación.'
            : 'Proveer productos de calidad que mejoren la vida de nuestros clientes, ofreciendo soluciones innovadoras y sostenibles.'}
        </p>
      </div>
      <div className="radio-buttons">
        <label>
          <input
            type="radio"
            value="vision"
            checked={selected === 'vision'}
            onChange={handleRadioChange}
          />
          <span className="checkmark vision"></span>
        </label>
        <label>
          <input
            type="radio"
            value="mision"
            checked={selected === 'mision'}
            onChange={handleRadioChange}
          />
          <span className="checkmark mision"></span>
        </label>
      </div>
    </div>
  );
};

export default CompanyMissionVision;
