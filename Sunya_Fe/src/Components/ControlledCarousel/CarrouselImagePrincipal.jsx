import React, { useState } from 'react';

// Importa las imágenes de tu carpeta assets
import img1 from '../../assets/img/fondoVerde.png';
import img2 from '../../assets/img/categoria1.png';
import img3 from '../../assets/img/categoria2.png';

const images = [img1, img2, img3];

export default function CarrouselImagePrincipal() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative w-full h-96"> {/* Establece una altura fija para las imágenes */}
      {/* Contenedor de imágenes */}
      <div className="overflow-hidden w-full h-full relative">
        <img
          src={images[currentIndex]}
          alt={`Imagen ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform"
        />

        {/* Texto centrado */}
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-8xl font-bold drop-shadow-md">Vén a Conocernos!!</h1>
        </div>
      </div>

      {/* Botón anterior */}
      <button
        onClick={handlePrevClick}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 p-2 bg-y-white text-white rounded-full hover:bg-green-600"
      >
        &larr;
      </button>

      {/* Botón siguiente */}
      <button
        onClick={handleNextClick}
        className="absolute top-1/2 right-6 transform -translate-y-1/2 p-2 bg-y-white text-white rounded-full hover:bg-green-600"
      >
        &rarr;
      </button>

      {/* Indicadores */}
      <div className="flex justify-center mt-2 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
          />
        ))}
      </div>
    </div>
  );
}