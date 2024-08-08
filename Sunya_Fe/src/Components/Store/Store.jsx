import { useEffect, useState } from 'react';
import './store.css';
import { Carousel, Col, Container, Modal, Row, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { cleanPartners, getPartners } from '../../Redux/Actions/actions';

const Store = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [selectedStore, setSelectedStore] = useState(null);
  const partners = useSelector((state) => state.partners);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(getPartners());
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();

    return () => {
      dispatch(cleanPartners());
    };
  }, [dispatch]);

  const handleClose = () => setShow(false);
  const handleShow = (store) => {
    setSelectedStore(store);
    setShow(true);
  };

  return (
    <div className="background-container">
      <div className="tittle_div">
        <h1 className="title">Nuestros Aliados</h1>
      </div>

      <Container>
        <Row className="justify-content-center">
          {partners.map((partner) => (
            <Col key={partner.id} xs={12} sm={6} md={4} lg={3} className="my-3">
              <img
                src={partner.image}
                alt={partner.name}
                className="img-fluid"
                style={{ cursor: 'pointer' }}
                onClick={() => handleShow(partner)}
              />
            </Col>
          ))}
        </Row>
        <p className="text-center mt-4 p_store">
          Contamos con diferentes puntos de venta aliados. Haciendo click en las
          imágenes puede ampliar la información y encontrar un punto de venta
          aliado cerca a tu ubicación. También contamos con un canal virtual, lo
          invitamos a realizar su pedido a través de nuestra tienda online
        </p>
      </Container>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Nuestros Aliados</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel>
            {partners.map((partner) => (
              <Carousel.Item key={partner.id}>
                <img
                  className="d-block w-100"
                  src={partner.image}
                  alt={partner.name}
                />
                <Carousel.Caption>
                  <h3>{partner.name}</h3>
                  <p>{partner.address}</p>
                  <p>{partner.phone}</p>
                  <p>{partner.city}</p>
                  <p>{partner.country}</p>
                </Carousel.Caption>
              </Carousel.Item>
            ))}
          </Carousel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Store;
