import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Card } from 'react-bootstrap';
import {
  cleanInfoStores,
  cleanUsersAdmin,
  getStores,
  getUsersAdmin,
  postAssignCasherStore,
} from '../../Redux/Actions/actions';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';

const AssignCashiersToStore = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const userInfo = useSelector((state) => state.userInfo);
  const token = userInfo.token;
  const headers = { Authorization: `Bearer ${token}` };
  const stores = useSelector((state) => state.stores);
  const users = useSelector((state) => state.users);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCashiers, setSelectedCashiers] = useState([]);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    const fetchStoresAndCashiers = async () => {
      await dispatch(getStores());
      await dispatch(getUsersAdmin({ headers }));
    };

    fetchStoresAndCashiers();
    return () => {
      dispatch(cleanUsersAdmin());
      dispatch(cleanInfoStores());
    };
  }, [dispatch, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      storeId: selectedStore,
      userIds: selectedCashiers,
    };

    console.log(data);
    try {
      const response = await dispatch(postAssignCasherStore({ headers, data }));
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El cajero fue asignado correctamente.',
        });
        setSelectedStore('');
        setSelectedCashiers([]);
        history.push("/admin/dashboard")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud. Cajero ya esta asignado a esa tienda.',
        });
      }
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
      });
    }
  };

  const handleCashierChange = (e) => {
    const cashierId = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCashiers((prevSelectedCashiers) => {
      if (isChecked) {
        return [...prevSelectedCashiers, cashierId];
      } else {
        return prevSelectedCashiers.filter((id) => id !== cashierId);
      }
    });
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={12}>
          <Card>
            <Card.Header>Asignar Cajeros a Tienda</Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formStore">
                  <Form.Label>Tienda</Form.Label>
                  <Form.Control
                    as="select"
                    value={selectedStore}
                    onChange={(e) => setSelectedStore(e.target.value)}
                    required
                  >
                    <option value="">Seleccionar Tienda</option>
                    {stores.map((store) => (
                      <option key={store.id} value={store.id}>
                        {store.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="formCashiers" className="mt-3">
                  <Form.Label>Cajeros</Form.Label>
                  {users
                    .filter((user) => user.id_role === 2 && user.active)
                    .map((user) => (
                      <Form.Check
                        key={user.id}
                        type="checkbox"
                        label={`${user.first_name} ${user.last_name}`}
                        value={user.n_document}
                        onChange={handleCashierChange}
                        checked={selectedCashiers.includes(user.id)}
                      />
                    ))}
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3">
                  Asignar Cajeros
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AssignCashiersToStore;
