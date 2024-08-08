import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import LoadingBox from '../LoadingBox';
import {municipios, departmentMap} from "../../data"
import {
  cleanCartItems,
  cleanPaymentMethod,
  cleanShippingAddress,
  deleteCartUser,
  getCartItems,
  postOrder,
} from '../../Redux/Actions/actions';
import './placeorder.css';
import { cleanPaymentsTypeSiigo, getPaymentsTypeSiigo } from '../../Redux/ActionsSiigo/actionsSiigo';

export default function PlaceOrder() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const userInfo = useSelector((state) => state.userInfo);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const paymentsType = useSelector((state) => state.paymentsType);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.Product.price, 0)
  );
  //const shippingPrice = itemsPrice > 100000 ? round2(0) : round2(19000);
  const taxPrice = round2(0.19 * itemsPrice);
  const totalPrice = itemsPrice + /*shippingPrice +*/ taxPrice;
  const country = departmentMap[shippingAddress?.state_code]
  const city = municipios[shippingAddress?.city_code]

  const findPaymentId = () => {
    const selectedPayment = paymentsType.find(payment => payment.name === paymentMethod)
    const paymentId = selectedPayment ? selectedPayment.id : null;
    return paymentId;
  };

  const placeOrderHandler = async () => {
    try {
      const paymentId = findPaymentId();
      const info = {
        id: id,
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        paymentId: paymentId,
        itemsPrice: itemsPrice,
        //shippingPrice: shippingPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      };

      const response = await dispatch(postOrder({ headers, info }));
      
      if (response.success) {
        
        dispatch(deleteCartUser({headers}))
        history.push(`/order/${response.orderId}`);
      }
    } catch (error) {
      console.error('Hubo un error al crear la orden:', error);
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      history.push('/payment');
    }
    dispatch(getCartItems({ headers, id }));
    dispatch(getPaymentsTypeSiigo({ headers }))

    return () => {
      dispatch(cleanCartItems());
      dispatch(cleanPaymentMethod())
      dispatch(cleanShippingAddress())
      dispatch(cleanPaymentsTypeSiigo());
    };
  }, [history, paymentMethod, dispatch, headers, id]);

  return (
    <div className='container_placeorder'>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>

      <h1 className="my-3">Vista Previa del Pedido</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Datos envio</Card.Title>
              <Card.Text>
                <strong>Nombres:</strong> {shippingAddress?.first_name} <br />
                <strong>Apellidos:</strong> {shippingAddress?.last_name} <br />
                <strong>Nombre Empresa</strong> {shippingAddress ? shippingAddress?.nameCompany : "N/A"} <br/>
                <strong>Dirección: </strong> {shippingAddress?.address}, {city}, {country}<br />
                <strong>Telefono: </strong> {shippingAddress?.phone}<br />
              </Card.Text>
              <Link to="/shipping">Editar</Link>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pago</Card.Title>
              <Card.Text>
                <strong>Medio:</strong> {paymentMethod}
              </Card.Text>
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {cartItems.map((item, index) => (
                  <ListGroup.Item key={item.id || index}>
                    <Row className="align-items-center">
                      <Col md={6}>
                        <img
                          src={item.Product.image}
                          alt={item.Product.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>{' '}
                        <Link to={`/product/${item.id_product}`}>
                          {item.Product.name}
                        </Link>
                      </Col>
                      <Col md={3}>
                        <span>{item.quantity}</span>
                      </Col>
                      <Col md={3}>${item.Product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
              <Link to="/cart">Editar</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Resumen del Pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Row>
                    <Col>Costo envio**</Col>
                    <Col>${shippingPrice.toFixed(2)}</Col>
                    <p className="message_order_delivery">
                      **Pedidos <strong>mayores</strong> a{' '}
                      <strong>$120.000.oo</strong> envio gratis
                    </p>
                  </Row>
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <Row>
                    <Col>Impuesto iva 19%</Col>
                    <Col>${taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total pedido</strong>
                    </Col>
                    <Col>
                      <strong>${totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      onClick={placeOrderHandler}
                      disabled={cartItems.length === 0}
                    >
                      Generar pedido
                    </Button>
                  </div>
                  {loading && <LoadingBox></LoadingBox>}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
