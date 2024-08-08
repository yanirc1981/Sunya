import { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  cleanCartItems,
  cleanProduct,
  getCartItems,
  getProductById,
  postAddToCart,
} from '../../Redux/Actions/actions';
import { BsCart3 } from "react-icons/bs";
import { FaShoppingCart } from 'react-icons/fa';
import './product.css';

export default function ProductScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id_product } = params;
  const userInfo = useSelector((state) => state.userInfo);
  
  const cartItems = useSelector((state) => state.cartItems)
  
  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);
  const product = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
  
    if (userInfo.token) {
      dispatch(getCartItems({ headers, id }))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  
    dispatch(getProductById(id_product))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));
  
    return () => {
      dispatch(cleanProduct());
      dispatch(cleanCartItems());
    };
  }, [dispatch, id_product, id, headers, userInfo.token]);
  

  const addToCartHandler = async (productId) => {
    const existingItem = cartItems.find(
      (item) => item.id_product === productId
    );
      
    try {
      if (existingItem) {
        const quantity = existingItem.quantity + 1;
        const productCart = existingItem.Product;
        if (productCart.countInStock < quantity) {
          alert("¡Producto sin stock!");
          return;
        }
        const response = await dispatch(
          postAddToCart({ headers, id, quantity, productId })
        );
        if (response.success) {
          history.push('/cart');
        }
      } else {
        const quantity = 1;
        if(product.countInStock < quantity) {
          alert("¡Producto sin stock!");
          return;
        }
        const response = await dispatch(
          postAddToCart({ headers, id, quantity, productId })
        );
        if (response.success) {
          history.push('/cart');
        }
      }
    } catch (error) {
      console.error('Hubo un error al agregar el producto al carrito:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className='div_productScreen'>
      <Row>
        <Col md={3}>
          <img
            className="product-image"
            src={product.image}
            alt={product.name}
          ></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <h3>{product.name}</h3>
             
            </ListGroup.Item>
            <ListGroup.Item><strong>Precio : </strong> $  {formatPrice(product.price)}</ListGroup.Item>
            <ListGroup.Item><strong>Marca : </strong> {product.brand}</ListGroup.Item>
            <ListGroup.Item><strong>Presentacion : </strong>  {product.slug}</ListGroup.Item>
            <ListGroup.Item>
              <strong>Descripción :</strong>
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Precio:</Col>
                    <Col>${formatPrice(product.price)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Estado:</Col>
                    <Col>
                      {product.countInStock > 0 ? (
                        <Badge bg="success">En Stock</Badge>
                      ) : (
                        <Badge bg="danger">Agotado</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>
                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <button
                        className="button_card"
                        onClick={
                          userInfo.token ? () => addToCartHandler(product.id) : null
                        }
                      >
                        {userInfo.token ? (
                          <>
                            <BsCart3  size={22} className="link_products"/> Agregar
                            
                          </>
                        ) : (
                          <Link to="/login" className="link_products">
                            <BsCart3  size={22} /> Agregar
                            
                          </Link>
                        )}
                      </button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
