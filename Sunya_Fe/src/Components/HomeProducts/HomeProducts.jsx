import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Product from '../Product/Product';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { FaHandHoldingUsd, FaWhatsapp, FaPercentage,FaFacebookF,FaInstagram } from 'react-icons/fa';
import { HomeIcon, ShoppingCartIcon } from '@heroicons/react/24/outline';


import { BsCart3, BsHouse } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { logoA, Wompy, MediosPago } from '../Image/Image';
import logo from '../../assets/img/logoSunya.png'

import './homeproducts.css';
import {
  getProducts,
  cleanProducts,
  getCartItems,
  cleanCartItems,
} from '../../Redux/Actions/actions';

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
  const [error, setError] = useState(false);

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

  return (
    <Container>
      <Carousel interval={3000} style={{ height: '50vh' }}>
        {products.map((product) => (
          <Carousel.Item key={product.id}>
            <img
              className="d-block w-100"
              src={product.image}
              alt={product.name}
              style={{
                height: '50vh',
                objectFit: 'cover',
                position: 'relative',
              }}
            />
            <img src={logoA} alt="Logo" className="watermark" />
          </Carousel.Item>
        ))}
      </Carousel>
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
      <Container className="container_icons mt-40">
        {' '}
        <Row className="justify-content-center">
          <Col xs={12} sm={6} lg={4} className="d-flex">
            <div className="inner-sin-feature">
              <div className="icon d-inline-block">
                <FaHandHoldingUsd />
              </div>
              <div className="f-content">
                <h6>Paga seguro, fácil y rápido con Bancolombia</h6>
                <div >
                  <img
                    src={Wompy}
                    alt="Wompy Bancolombia"
                    className="HomeProducts-img-small"
                  />
                  <img
                    src={MediosPago}
                    alt="Medios de pago"
                    className="HomeProducts-img-small"
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={4} className="d-flex">
            <div className="inner-sin-feature">
              <div className="icon d-inline-block">
                <FaWhatsapp style={{ fontSize: '2rem', color: '#25D366' }} />
              </div>
              <div className="f-content">
                <h6 >Atención al cliente</h6>
                <p>Tienes dudas?, contactanos. Click whatsapp</p>
                <a 
                  href="https://wa.me/1234567890" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whatsapp-link"

                >
                  <FaWhatsapp style={{ 
                      fontSize: '4rem', 
                      color: '#25D366', 
                      display: 'block', 
                      margin: '0 auto' , 
                      marginTop:'12%'
                    }}  />
                </a>
              </div>
            </div>
          </Col>
          <Col xs={12} sm={6} lg={4} className="d-flex">
            <div className="inner-sin-feature">
              <div className="icon d-inline-block">
                <FaPercentage />
              </div>
              <div className="f-content">
                <h6>Ofertas y promociones</h6>
                <p>Síguenos en redes y encuentra ofertas.</p>
                <div className="social-icons" style={{display:'flex', gap:'20', marginLeft:'40%', marginTop:'10%'}}>
                  <a 
                    href="https://www.instagram.com/sunyagaleriadelartesano/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="instagram-link"
                  >
                    <FaInstagram 
                      style={{ 
                        fontSize: '4rem', 
                        color: '#E4405F', // Color original de Instagram
                        marginRight: '10px'
                      }}  
                    />
                  </a>
                  <a 
                    href="https://www.facebook.com/sunyagaleriadelartesano" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="facebook-link"
                  >
                    <FaFacebookF 
                      style={{ 
                        fontSize: '4rem', 
                        color: '#1877F2', // Color original de Facebook
                      }}  
                    />
                  </a>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
