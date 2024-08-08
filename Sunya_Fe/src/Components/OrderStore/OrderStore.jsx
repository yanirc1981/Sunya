import { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanOrder,
  putOrderDelivery,
  putOrderPaymentResult,
} from '../../Redux/Actions/actions';
import { v4 as uuidv4 } from 'uuid';
import './orderstore.css';
import WompiWidget from '../WompiWidget/WompiWidget';
import { Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { transportOptions, departmentMap, municipios } from '../../data';
import DatePicker from 'react-datepicker';

export default function OrderStore() {
  
  const params = useParams();
  const { id: orderId } = params;
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [priceInCents, setPriceInCents] = useState(0);
  const [reference, setReference] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState(false);
  const order = useSelector((state) => state.order);
  const orderAddress = 'Oficina ' + order.id;
  const userInfo = useSelector((state) => state.userInfo);
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);
  const isAdmin = userInfo?.user?.id_role === 3;
  const [isPending, setIsPending] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);
  const publicKey = import.meta.env.VITE_API_PUBLICKEY;
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [checkNumber, setCheckNumber] = useState('');
  const [checkBank, setCheckBank] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [transactionNumber, setTransactionNumber] = useState('');
  const [guideNumber, setGuideNumber] = useState('');
  const [transport, setTransport] = useState('');
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleShowModalA = () => setShowModalA(true);
  const handleCloseModalA = () => setShowModalA(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const orderId = order.id;
  
    // Validar si la fecha de vencimiento es obligatoria
    if ((order.paymentMethod === 'Crédito' || order.paymentMethod === 'Pagos a credito') && !expiryDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'La fecha de vencimiento es obligatoria para el método de pago seleccionado.',
      });
      return; 
    }
  
    // Construir el objeto de datos para enviar
    const data = {
      totalPrice: order.totalPrice,
      status: 'Aprobada',
      date: new Date().toISOString(),
      expiryDate: expiryDate ? expiryDate.toISOString() : null, // Convertir fecha a formato ISO si está presente
      paymentMethod: order.paymentMethod,
      checkNumber: order.paymentMethod === 'Cheque' ? checkNumber : null,
      checkBank: order.paymentMethod === 'Cheque' ? checkBank : null,
      transactionNumber: order.paymentMethod === 'Transferencia Bancaria' ? transactionNumber : null,
    };
 
    try {
      const response = await dispatch(putOrderPaymentResult({ orderId, data, headers }));
      
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El pago se registró exitosamente.',
        });
        setCheckNumber('');
        setCheckBank('');
        setTransactionNumber('');
        setExpiryDate(null); // Limpiar la fecha de vencimiento
        handleCloseModal();
        history.push('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar tu solicitud.',
      });
    }
  };
  

  const handleSubmitDelivery = async (e) => {
    e.preventDefault();
    const orderId = order.id;
    const data = {
      date: new Date().toISOString(),
      numberGuide: guideNumber,
      transport: transport,
      shippingPrice: order.shippingPrice,
      shippingAddress: order.shippingAddress,
      shippingAddressCity: municipios[order.shippingAddress.city_code],
      shippingAddressCountry: departmentMap[order.shippingAddress.state_code],
      shippingAddressPhone: order.shippingAddress.phone,
    };
    console.log(JSON.stringify(data, null, 2))
    try {
      const response = await dispatch(
        putOrderDelivery({ orderId, data, headers })
      );
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Datos envio se registro exitosamente.',
        });
        setGuideNumber('');
        setTransport('');
        handleCloseModalA();
        history.push('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar tu solicitud.',
      });
    }
  };

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
              <Card.Title>Datos cliente</Card.Title>
              <Card.Text>
                <strong>Nombres:</strong> {order.shippingAddress.first_name}{' '}
                <br />
                <strong>Apellidos:</strong> {order.shippingAddress.last_name}{' '}
                <br />
                <strong>Dirección:</strong> {order.shippingAddress.address}{' '}
                <br />
                <strong>Teléfono contacto: </strong>{' '}
                {order.shippingAddress.phone} <br />
                <strong>Correo electrónico: </strong>{' '}
                {order.shippingAddress.email}
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
                {!order.isPaid &&
                  (order.paymentMethod === 'wompi' ? (
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
                          Name={order.shippingAddress.first_name}
                          Municipio={order.shippingAddress.city_code}
                          Departamento={order.shippingAddress.country_code}
                        />
                      )}
                      {loadingPay && <LoadingBox />}
                    </div>
                  ) : (
                    <Button variant="primary" onClick={handleShowModal}>
                      Pagar
                    </Button>
                  ))}
                {isAdmin && order.isPaid && !order.isDelivered && (
                  <ListGroup.Item>
                    {loadingDeliver && <LoadingBox></LoadingBox>}
                    <div>
                      <Button type="button" onClick={handleShowModalA}>
                        Enviar Pedido
                      </Button>
                    </div>
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Pago</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Card>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Total Pago</Form.Label>
            <Form.Control type="text" value={order.totalPrice} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Estado</Form.Label>
            <Form.Control type="text" value="Aprobada" readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Fecha</Form.Label>
            <Form.Control
              type="text"
              value={new Date().toISOString()}
              readOnly
            />
          </Form.Group>
          {order.paymentMethod === 'Cheque' && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Número de Cheque</Form.Label>
                <Form.Control
                  type="text"
                  value={checkNumber}
                  onChange={(e) => setCheckNumber(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Banco del Cheque</Form.Label>
                <Form.Control
                  type="text"
                  value={checkBank}
                  onChange={(e) => setCheckBank(e.target.value)}
                  required
                />
              </Form.Group>
            </>
          )}
          {(order.paymentMethod === 'Transferencia' || order.paymentMethod === 'Consignacion') && (
            <Form.Group className="mb-3">
              <Form.Label># Transacción</Form.Label>
              <Form.Control
                type="text"
                value={transactionNumber}
                onChange={(e) => setTransactionNumber(e.target.value)}
                required
              />
            </Form.Group>
          )}
          {(order.paymentMethod === 'Crédito' || order.paymentMethod === 'Pagos a credito') && (
            <Form.Group className="mb-3">
              <Form.Label>Fecha de Vencimiento</Form.Label>
              <DatePicker
                selected={expiryDate}
                onChange={(date) => setExpiryDate(date)}
                className="form-control"
                dateFormat="yyyy/MM/dd"
              />
            </Form.Group>
          )}
          <Form.Group className="mb-3">
            <Form.Label>Método de Pago</Form.Label>
            <Form.Control
              type="text"
              value={order.paymentMethod}
              readOnly
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Enviar
          </Button>
        </Form>
      </Card.Body>
    </Card>
        </Modal.Body>
      </Modal>
      <Modal show={showModalA} onHide={handleCloseModalA}>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Envio</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmitDelivery}>
                <Form.Group className="mb-3">
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    type="text"
                    value={new Date().toISOString()}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Número de Guía</Form.Label>
                  <Form.Control
                    type="text"
                    value={guideNumber}
                    onChange={(e) => setGuideNumber(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Transportadora</Form.Label>
                  <Form.Select
                    value={transport}
                    onChange={(e) => setTransport(e.target.value)}
                    required
                  >
                    <option value="">Selecciona una transportadora</option>
                    {transportOptions.map((option, index) => (
                      <option key={index} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                {/* <Form.Group className="mb-3">
                  <Form.Label>Valor Flete</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.shippingPrice.toFixed(2)}
                    readOnly
                  />
                </Form.Group> */}

                <Form.Group className="mb-3">
                  <Form.Label>Direccion Envio</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.shippingAddress.address}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Municipio</Form.Label>
                  <Form.Control
                    type="text"
                    value={municipios[order.shippingAddress.city_code]}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Departamento</Form.Label>
                  <Form.Control
                    type="text"
                    value={departmentMap[order.shippingAddress.state_code]}
                    readOnly
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono Contacto</Form.Label>
                  <Form.Control
                    type="text"
                    value={order.shippingAddress.phone}
                    readOnly
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Enviar
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
      </Modal>
    </div>
  );
}
