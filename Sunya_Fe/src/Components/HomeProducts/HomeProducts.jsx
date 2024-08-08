import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import Product from '../Product/Product';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { FaHandHoldingUsd, FaHeadset, FaPercentage } from 'react-icons/fa';
import { BsCart3, BsHouse } from 'react-icons/bs';
import { NavLink } from 'react-router-dom';
import { logoA, Wompy, MediosPago } from '../Image/Image';
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
      <h2 className="text-center my-4 h2_tittleStore">
        <strong>NUESTROS</strong> PRODUCTOS
      </h2>
      <p className="text-center mb-4 p_Store">
        Encuentra lo que necesitas en nuestra selección de productos
      </p>
      <div className="div_store_icons">
        <NavLink to="/">
          <BsHouse className="icon_cart_store" />
        </NavLink>
        <NavLink to="/cart">
          <BsCart3 className="icon_cart_store" />
        </NavLink>{' '}
        {cartItems?.length > 0 && (
          <h6 className="cart_item_message">
            {' '}
            {cartItems.reduce((a, c) => a + c.quantity, 0)}
            {''}
          </h6>
        )}{' '}
      </div>

      <Row className="justify-content-center">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.map((product) => (
              <Col
                xs={12}
                sm={6}
                md={4}
                lg={3}
                className="mb-4 d-flex"
                key={product.id}
              >
                <Product product={product}></Product>
              </Col>
            ))}
          </>
        )}
      </Row>
      <Container className="container_icons">
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
                <FaHeadset />
              </div>
              <div className="f-content">
                <h6>Atención al cliente</h6>
                <p>Tienes dudas?, contactanos. Click whatsapp</p>
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
                <p>Siguenos en redes y encuentra ofertas.</p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
}
