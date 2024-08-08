import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import { cleanOrder } from '../../Redux/Actions/actions';
import { v4 as uuidv4 } from 'uuid';
import './order.css';
import WompiWidget from '../WompiWidget/WompiWidget';

export default function Order() {
  const params = useParams();
  const { id: orderId } = params;
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [priceInCents, setPriceInCents] = useState(0);
  const [reference, setReference] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState(false);
  const order = useSelector((state) => state.order);
  //console.log(JSON.stringify(order, null, 2));
  const orderAddress = 'Oficina ' + order.id;
  const [isPending, setIsPending] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const publicKey = import.meta.env.VITE_API_PUBLICKEY;
  const nameWompyWidget = order.shippingAddress.first_name + " " + order.shippingAddress.last_name

  useEffect(() => {
    const generatedReference = uuidv4();
    setReference(generatedReference);
    const cents = order.totalPrice * 100;
    setPriceInCents(cents);
    return () => {
      dispatch(cleanOrder());
    };
  }, [dispatch, order]);

  useEffect(() => {
    // Este efecto se ejecuta cuando cambian los valores de referencia, priceInCents, etc.
    const moneda = 'COP';
    const secretKey = import.meta.env.VITE_API_SECRETKEY;

    const generateHash = async () => {
      const totalPrice = priceInCents.toString(); // Convierte el priceInCents a string

      var cadenaConcatenada = reference + totalPrice + moneda + secretKey;
      const encondedText = new TextEncoder().encode(cadenaConcatenada);
      const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      setHash(hashHex);
    };

    generateHash();
  }, [reference, priceInCents]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container_order">
      <h1 className="my-3">Pedido {orderId}</h1>
      <Row>
        <Col md={8}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Datos envio</Card.Title>
              <Card.Text>
                <strong>Nombres:</strong> {order.shippingAddress.first_name}{' '}
                <br />
                <strong>Apellidos:</strong> {order.shippingAddress.last_name}{' '}
                <br />
                <strong>Dirección: </strong> {order.shippingAddress.address},
                {order.shippingAddress.city_code},{' '}
                {order.shippingAddress.state_code},{' '}
                {order.shippingAddress.phone}
              </Card.Text>
              {order.isDelivered ? (
                <MessageBox variant="success">
                  Despachado el {order.deliveredAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">No despachado</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Pago</Card.Title>
              <Card.Text>
                <strong>Metodo:</strong> {order.paymentMethod}
              </Card.Text>
              {order.isPaid ? (
                <MessageBox variant="success">
                  Pagado el {order.paidAt}
                </MessageBox>
              ) : (
                <MessageBox variant="danger">No pagado</MessageBox>
              )}
            </Card.Body>
          </Card>

          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Items</Card.Title>
              <ListGroup variant="flush">
                {order.orderItems.map((item) => (
                  <ListGroup.Item key={item.Product.id}>
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
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Resumen pedido</Card.Title>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>${order.itemsPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                {/* <ListGroup.Item>
                  <Row>
                    <Col>Costo envio**</Col>
                    <Col>${order.shippingPrice.toFixed(2)}</Col>
                    <p className="message_order_delivery">
                      **Pedidos <strong>mayores</strong> a{' '}
                      <strong>$120.000.oo</strong> envio gratis
                    </p>
                  </Row>
                </ListGroup.Item> */}
                <ListGroup.Item>
                  <Row>
                    <Col>Impuesto IVA 19%</Col>
                    <Col>${order.taxPrice.toFixed(2)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>
                      <strong>Total pedido</strong>
                    </Col>
                    <Col>
                      <strong>${order.totalPrice.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {order.paymentMethod === 'wompi' && !order.isPaid ? (
                  <div className="div_wompy">
                    {isPending ? (
                      <LoadingBox />
                    ) : (
                      <WompiWidget
                        productPriceInCents={priceInCents}
                        reference={reference}
                        publicKey={publicKey}
                        signature={hash}
                        Email={order.shippingAddress.email}
                        Phone={order.shippingAddress.phone}
                        Address={order.shippingAddress.address}
                        Order={orderAddress}
                        Name={nameWompyWidget}
                        Municipio={order.shippingAddress.city_code}
                        Departamento={order.shippingAddress.country_code}
                      />
                    )}
                    {loadingPay && <LoadingBox />}
                  </div>
                ) : null}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
