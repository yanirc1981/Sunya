import { escudo, restrepo, sena, emprender } from '../Image/Image';
import { FaInstagram, FaEnvelope } from 'react-icons/fa';

export default function Footer() {

return (
  <footer className="bg-yellow-200 text-white py-4">
    <div className="container mx-auto flex flex-col items-center space-y-2">
      <div className="flex space-x-4 mb-2">
        <img src={escudo} alt="Logo 1" className="h-64 w-64" />
        <img src={restrepo} alt="Logo 2" className="h-64 w-64" />
        <img src={sena} alt="Logo 3" className="h-64 w-64" />
        <img src={emprender} alt="Logo 4" className="h-64 w-64" />
      </div>
      <div className="text-center mb-2">
        <a href="/terms-and-conditions" className="text-green-700 hover:underline">
          Términos y Condiciones
        </a>
      </div>
      <div className="flex space-x-4">
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <FaInstagram className="h-8 w-8 text-green-700" />
        </a>
        <a href="mailto:contact@example.com">
          <FaEnvelope className="h-8 w-8 text-green-700" />
        </a>
      </div>
    </div>
  </footer>
);
};
