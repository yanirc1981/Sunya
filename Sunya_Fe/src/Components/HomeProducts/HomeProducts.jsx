import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Product from '../Product/Product';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';

import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';

import { NavLink } from 'react-router-dom';
import './homeproducts.css';
import {
  getProducts,
  cleanProducts,
  getCartItems,
  cleanCartItems,
} from '../../Redux/Actions/actions';

// Importa las imágenes desde assets
import banner1 from '../../assets/img/logoprueba1.png';
import banner2 from '../../assets/img/logoprueba2.png';
import banner3 from '../../assets/img/logoprueba3.png';

export default function HomeProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);
  const userInfo = useSelector((state) => state.userInfo);
  const cartItems = useSelector((state) => state.cartItems);
  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);
  const [loading, setLoading] = useState(false);
  const [error, ] = useState(false);

  // Estado del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerImages = [banner1, banner2, banner3];

  useEffect(() => {
    setLoading(true);

    const fetchData = async () => {
      try {
        if (userInfo.token) {
          await dispatch(getCartItems({ headers, id }));
        }
        await dispatch(getProducts());
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      dispatch(cleanProducts());
      dispatch(cleanCartItems());
    };
  }, [dispatch, userInfo.token, headers, id]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === bannerImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? bannerImages.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      {/* Carrusel */}
      <div className="relative w-full overflow-hidden ">
        <div
          className="relative w-full h-60 flex transition-transform duration-700 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {bannerImages.map((src, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-full h-full"
              style={{
                backgroundImage: `url(${src})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
          ))}
        </div>
        {/* Botones de navegación */}
        <button
          onClick={prevSlide}
          className="absolute ml-4 top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 text-gray-800 rounded-full shadow-md hover:bg-gray-200"
        >
          &lt;
        </button>
        <button
          onClick={nextSlide}
          className="absolute mr-4 top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 text-gray-800 rounded-full shadow-md hover:bg-gray-200"
        >
          &gt;
        </button>
        {/* Indicadores */}
        <div className="absolute bottom-0 left-0 w-full flex justify-center mb-4">
          {bannerImages.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 mx-1 rounded-full ${currentIndex === index ? 'bg-white opacity-75' : 'bg-white opacity-50'}`}
              aria-label={`Slide ${index + 1}`}
              onClick={() => setCurrentIndex(index)}
            ></button>
          ))}
        </div>
      </div>

      <h2 className="text-center text-3xl font-bold text-yellow-600 my-8 tracking-widest">
        NUESTROS PRODUCTOS
      </h2>
      <p className="text-center mb-8 text-lg text-gray-700">
        Encuentra lo que necesitas en nuestra selección de productos
      </p>
      <div className="flex justify-center items-center space-x-4 mb-16">
        <NavLink to="/">
          <HomeIcon className="h-8 w-8 text-yellow-600 hover:text-yellow-800 transition duration-300" />
        </NavLink>
        <NavLink to="/cart">
          <ShoppingCartIcon className="h-8 w-8 text-yellow-600 hover:text-yellow-800 transition duration-300" />
        </NavLink>
        {cartItems?.length > 0 && (
          <span className="text-sm font-bold text-red-600 bg-yellow-200 px-2 py-1 rounded-full">
            {cartItems.reduce((a, c) => a + c.quantity, 0)}
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white shadow-lg rounded-lg p-4 flex flex-col"
              >
                <Product product={product} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
}




