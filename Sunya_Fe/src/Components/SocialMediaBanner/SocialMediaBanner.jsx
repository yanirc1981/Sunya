import { FaFacebookF, FaInstagram, FaEnvelope } from 'react-icons/fa';

const SocialMediaBanner = () => {
  return (
    <div className="bg-gray-100 py-8 mb-40 mt-16">
      <div className="max-w-6xl mx-auto text-center">
        <p className=" font-semibold text-gray-700 mb-4 text-4xl">
          Seguinos en nuestras redes sociales:
        </p>
        <div className="flex justify-center space-x-8">
          <a
            href="https://www.facebook.com/sunyagaleriadelartesano"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 text-6xl"
          >
            <FaFacebookF />
          </a>
          <a
            href="https://www.instagram.com/sunyagaleriadelartesano/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-600 hover:text-pink-800 text-6xl"
          >
            <FaInstagram />
          </a>
          <a
            href="mailto:sunyalacasadelartesano@gmail.com"
            className="text-gray-600 hover:text-gray-800 text-6xl"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SocialMediaBanner;

