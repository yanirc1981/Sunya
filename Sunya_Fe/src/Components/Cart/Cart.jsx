import React, { useState, useEffect, useMemo } from 'react';
import Col from 'react-bootstrap/esm/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/esm/Row';
import { Link, useHistory } from 'react-router-dom';
import MessageBox from "../MessageBox";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanCartItems,
  deleteProductToCart,
  getCartItems,
  getProducts,
  postAddToCart,
  removeProductToCart,
} from '../../Redux/Actions/actions';
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { PiTrashDuotone } from "react-icons/pi";
import "./cart.css";

export default function Cart() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.products);
  const cartItems = useSelector((state) => state.cartItems);
  const id = userInfo?.user?.id;
  const role = userInfo?.user?.id_role;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);

  const [showSidebar, setShowSidebar] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState({});

  useEffect(() => {
    if (userInfo.token) {
      dispatch(getCartItems({ headers, id }));
      dispatch(getProducts());
    }
    return () => {
      dispatch(cleanCartItems());
    };
  }, [dispatch, userInfo.token, headers, id]);

  const updateCartHandler = async (productId, quantity) => {
    try {
      const response = await dispatch(
        postAddToCart({ headers, id, quantity, productId })
      );

      if (response.success) {
        dispatch(cleanCartItems());
        dispatch(getCartItems({ headers, id }));
      }
    } catch (error) {
      console.error('Hubo un error al agregar el producto al carrito:', error);
    }
  };

  const updateCartHandlerRemove = async (productId) => {
    try {
      const response = await dispatch(
        removeProductToCart({ headers, id, productId })
      );
      if (response.success) {
        dispatch(cleanCartItems());
        dispatch(getCartItems({ headers, id }));
      }
    } catch (error) {
      console.error('Hubo un error al remover el producto del carrito:', error);
    }
  };

  const removeItemHandler = async (productId) => {
    try {
      const response = await dispatch(deleteProductToCart({ headers, id, productId }));
      if (response.success) {
        dispatch(cleanCartItems());
        dispatch(getCartItems({ headers, id }));
      }
    } catch (error) {
      console.error('Hubo un error al eliminar el producto del carrito:', error);
    }
  };

  const checkoutHandler = () => {
    if (role === 3 || role === 2) {
      history.push('/shipping2');
    } else {
      history.push("/shipping");
    }
  };

  const handleAddProducts = () => {
    setShowSidebar(true);
  };

  const handleSidebarClose = () => {
    setShowSidebar(false);
  };

  const handleProductChange = (productId, quantity) => {
    setSelectedProducts(prev => ({
      ...prev,
      [productId]: quantity
    }));
  };

  const handleAddSelectedProducts = async () => {
    for (const [productId, quantity] of Object.entries(selectedProducts)) {
      await updateCartHandler(productId, quantity);
    }
    setShowSidebar(false);
  };

  return (
    <div className='cart-container'>
      <h2>Carrito de compras</h2>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Carrito está vacío.{' '}
              <Link to="/products">Ir tienda en línea</Link>
            </MessageBox>
          ) : (
            <>
              <ListGroup>
                <MessageBox>
                  Continuar comprando
                  <Link to="/products"> Ir tienda en línea</Link>
                </MessageBox>
                {cartItems.map((item) => (
                  <ListGroup.Item key={item.id_product}>
                    <Row className="align-items-center">
                      <Col md={4}>
                        <img
                          src={item.Product.image}
                          alt={item.Product.name}
                          className="cart-img img-fluid rounded img-thumbnail"
                        />{' '}
                        <Link to={`/product/${item.id_product}`}>
                          {item.Product.name}
                        </Link>
                      </Col>
                      <Col md={1}>
                        <Button
                          variant="light"
                          onClick={() => updateCartHandlerRemove(item.id_product)}
                          disabled={item.quantity === 1}
                        >
                          <FaCircleMinus />
                        </Button>
                      </Col>
                      <Col md={1}>
                        <p className='cart-span'>{item.quantity}</p>
                      </Col>
                      <Col md={1}>
                        <Button
                          variant="light"
                          onClick={() => updateCartHandler(item.id_product, 1)}
                          disabled={item.Product.countInStock === 0}
                        >
                          <FaCirclePlus />
                        </Button>
                      </Col>
                      <Col md={3}>${item.Product.price}</Col>
                      <Col md={2}>
                        <Button
                          onClick={() => removeItemHandler(item.id_product)}
                          variant="light"
                        >
                          <PiTrashDuotone />
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Button className="cart-button" variant="primary" onClick={handleAddProducts}>
                Agregar más productos
              </Button>
            </>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({cartItems.reduce((a, c) => a + c.quantity, 0)}{' '}
                    items) : $
                    {cartItems.reduce((a, c) => a + c.Product.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Continuar con el proceso de pago
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Sidebar for adding products */}
      {showSidebar && (
        <div className="cart-sidebar">
          <div className="cart-sidebar-content">
            <Button variant="primary" onClick={handleSidebarClose}>
              Cerrar
            </Button>
            <h3>Agregar productos al carrito</h3>
            <ListGroup>
              {products.map((product) => (
                <ListGroup.Item key={product.id}>
                  <Row className="align-items-center">
                    <Col md={1}>
                      <input
                        type="checkbox"
                        className="cart-input-checkbox"
                        checked={selectedProducts[product.id] !== undefined}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts(prev => ({
                              ...prev,
                              [product.id]: 1
                            }));
                          } else {
                            const newSelectedProducts = { ...selectedProducts };
                            delete newSelectedProducts[product.id];
                            setSelectedProducts(newSelectedProducts);
                          }
                        }}
                      />
                    </Col>
                    <Col md={4}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="cart-img img-fluid rounded img-thumbnail"
                      />{' '}
                      {product.name}
                    </Col>
                    <Col md={3}>
                      <input
                        type="number"
                        className="cart-input-number"
                        min="0"
                        value={selectedProducts[product.id] || ''}
                        onChange={(e) => handleProductChange(product.id, parseInt(e.target.value))}
                      />
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              className="cart-button"
              variant="primary"
              onClick={handleAddSelectedProducts}
            >
              Agregar productos seleccionados
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
