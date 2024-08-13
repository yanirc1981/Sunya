import React, { useEffect, useMemo, useState } from 'react';
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
  const [error] = useState(false);

  // Estado del carrusel
  const [currentIndex, setCurrentIndex] = useState(0);
  const bannerImages = [banner1, banner2, banner3];

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(products.length / itemsPerPage);

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

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calcular los productos actuales para mostrar en la página
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = products.slice(indexOfFirstItem, indexOfLastItem);

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
              className={`w-3 h-3 mx-1 rounded-full ${
                currentIndex === index ? 'bg-white opacity-75' : 'bg-white opacity-50'
              }`}
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

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2 md:px-4 lg:px-8">
  {loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <>
      {currentProducts.map((product) => (
        <div
          key={product.id}
          className="bg-white shadow-lg rounded-lg p-4 flex flex-col mx-1 sm:mx-1 lg:mx-4 sm:p-3 lg:p-4 sm:max-w-xs lg:max-w-full"
        >
          <Product product={product} />
        </div>
      ))}
    </>
  )}
</div>



      {/* Paginación */}
      <div className="flex justify-center mt-10 mb-10">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 mx-1 text-gray-600 bg-gray-200 rounded disabled:opacity-50"
        >
          Anterior
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            className={`px-4 py-2 mx-1 ${
              currentPage === page + 1
                ? 'bg-yellow-600 text-white'
                : 'bg-gray-200 text-gray-600'
            } rounded`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 mx-1 text-gray-600 bg-gray-200 rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}





