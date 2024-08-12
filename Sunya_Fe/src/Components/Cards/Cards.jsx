import { useState } from 'react';
import { Link } from 'react-router-dom';
import ImageComponent from '../ImageComponent/ImageComponent';


function Cards() {
  const [index, setIndex] = useState(0);

  const images = [
    {
      component: <ImageComponent text="First slide" />,
      title: "LÁCTEOS",
      subtitle: "Yogurt, Kumis, Avena",
    },
    {
      component: <ImageComponent text="Third slide" />,
      title: "QUESOS",
      subtitle: "Frescos y Maduros",
    },
    {
      component: <ImageComponent text="Fourth slide" />,
      title: "POSTRES",
      subtitle: "Frescos y Deliciosos",
    },
  ];

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="absolute inset-0 flex justify-between items-center px-4 z-10">
        <button
          onClick={handlePrev}
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-bold py-2 px-4 rounded-full focus:outline-none"
        >
          &#8249;
        </button>
        <button
          onClick={handleNext}
          className="bg-white bg-opacity-50 hover:bg-opacity-75 text-black font-bold py-2 px-4 rounded-full focus:outline-none"
        >
          &#8250;
        </button>
      </div>
      {images.map((image, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            i === index ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{ display: i === index ? 'block' : 'none' }}
        >
          <div className="w-full h-full relative">
            {image.component}
            <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
              <Link to="/products" className="text-center">
                <div className="text-4xl font-bold">{image.title}</div>
                <div className="text-lg mt-2">{image.subtitle}</div>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;


