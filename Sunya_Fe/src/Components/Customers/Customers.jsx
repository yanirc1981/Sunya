import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { cleanCustomersAdmin, getCustomersAdmin } from '../../Redux/Actions/actions';
import { FaEdit, FaSearch, FaRedoAlt } from 'react-icons/fa';


//import EditCustomer from '../EditCustomer/EditCustomer';

const Customers = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const customers = useSelector((state) => state.customersDataBase);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };

    setIsLoading(true); // Activar isLoading al comenzar la carga

    dispatch(getCustomersAdmin({ headers }))
      .then(() => setIsLoading(false)) // Desactivar isLoading cuando la carga está completa
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanCustomersAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra los usuarios basados en el término de búsqueda
    const filtered = customers.filter(
      (customer) => customer.identification.includes(term)
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div className="container_tableUsers">
      <div className="search-container">
        <FaSearch className="icon_search_1" />
        <Form.Group controlId="searchTerm" className="mb-2">
          <Form.Control
            type="text"
            placeholder="Buscar por identificación cliente"
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </Form.Group>
        <FaRedoAlt
          variant="secondary"
          onClick={() => setSearchTerm('')}
          className="icon_search"
        />
      </div>
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <Table responsive className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th># IDENTIFICACION</th>
              <th>STATUS CLIENTE</th>
              <th>NOMBRES</th>
              <th>APELLIDOS</th>
              <th>RAZON SOCIAL</th>
              <th>TIPO DE PERSONA</th>
              <th>DIRECCION</th>
              <th>CODIGO CIUDAD</th>
              <th>CODIGO DEPARTAMENTO</th>
              <th>TELEFONO</th>
              <th>ID VENDEDOR ASIGNADO</th>
              <th>ID COBRADOR ASIGNADO</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm === ''
              ? // Si el término de búsqueda está vacío, renderizar todos los usuarios
                customers.map((customer, index) => {
                  const customerStatus = customer.active ? 'activo' : 'inactivo';
                  const personType = customer.person_type === "Person" ? "Persona" : "Compañia"              
                
                  return (
                    <tr key={index}>
                      <td>{customer.identification}</td>
                      <td>{customerStatus}</td>
                      <td>{customer.first_name}</td>
                      <td>{customer.last_name}</td>
                      <td>{customer.nameCompany}</td>
                      <td>{personType}</td>
                      <td>{customer.address}</td>
                      <td>{customer.city_code}</td>
                      <td>{customer.state_code}</td>
                      <th>{customer.number}</th>
                      <td>{customer.seller_id}</td>
                      <td>{customer.collector_id}</td>
                      <td>
                        <FaEdit
                          onClick={() => handleEdit(customer)}
                          className="icon_edit"
                          title="Modificar info"
                        />
                      </td>
                    </tr>
                  );
                })
              : // Si hay un término de búsqueda, renderizar los usuarios filtrados
                filteredCustomers.map((customer, index) => {
                  const customerStatus = customer.active ? 'activo' : 'inactivo';
                  const personType = customer.person_type === "Person" ? "Persona" : "Compañia"
                  
                  return (
                    <tr key={index}>
                    <td>{customer.identification}</td>
                    <td>{customerStatus}</td>
                    <td>{customer.first_name}</td>
                    <td>{customer.last_name}</td>
                    <td>{customer.nameCompany}</td>
                    <td>{personType}</td>
                    <td>{customer.address}</td>
                    <td>{customer.city_code}</td>
                    <td>{customer.state_code}</td>
                    <th>{customer.number}</th>
                    <td>{customer.seller_id}</td>
                    <td>{customer.collector_id}</td>
                    <td>
                      <FaEdit
                        onClick={() => handleEdit(customer)}
                        className="icon_edit"
                        title="Modificar info"
                      />
                    </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      )}
      {selectedCustomer && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              <h2>
                Editar información del usuario con ID: {selectedCustomer.identification}
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Hola estoy en construccion
            {/* <EditCustomer customer={selectedCustomer} setShowModal={setShowModal} /> */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Customers;
