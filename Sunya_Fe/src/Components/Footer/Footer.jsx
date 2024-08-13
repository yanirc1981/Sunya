import { escudo, restrepo, sena, emprender } from '../Image/Image';
import { FaInstagram, FaEnvelope, FaFacebook } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-yellow-200 text-white py-2 mt-auto w-full">
      <div className="container mx-auto flex flex-col items-center">
        {/* Contenedor de imágenes */}
        <div className="flex justify-center space-x-2 mb-2">
          <img src={escudo} alt="Logo 1" className="h-24 w-24" />
          <img src={restrepo} alt="Logo 2" className="h-24 w-24" />
          <img src={sena} alt="Logo 3" className="h-24 w-24" />
          <img src={emprender} alt="Logo 4" className="h-24 w-24" />
        </div>
        {/* Enlace de términos y condiciones */}
        <div className="text-center mb-2 w-full">
          <a href="/terms-and-conditions" className="text-green-700 hover:underline">
            Términos y Condiciones
          </a>
        </div>
        {/* Íconos sociales */}
        <div className="flex justify-center space-x-4 mb-2 w-full">
          <a href="https://www.instagram.com/sunyagaleriadelartesano/" target="_blank" rel="noopener noreferrer">
            <FaInstagram className="h-6 w-6 text-green-700" />
          </a>
          <a href="mailto:sunyalacasadelartesano@gmail.com">
            <FaEnvelope className="h-6 w-6 text-green-700" />
          </a>
          <a href="https://www.facebook.com/sunyagaleriadelartesano" target="_blank" rel="noopener noreferrer">
            <FaFacebook className="h-6 w-6 text-green-700" />
          </a>
        </div>
      </div>
    </footer>
  );
}





