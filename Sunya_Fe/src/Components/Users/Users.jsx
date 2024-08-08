import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Modal, Button, Form, Spinner } from 'react-bootstrap';
import { cleanUsersAdmin, getUsersAdmin } from '../../Redux/Actions/actions';
import { FaEdit, FaSearch, FaRedoAlt } from 'react-icons/fa';
import './users.css';
import EditProfile from '../EditProfile/EditProfile';

const Users = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };

    setIsLoading(true); // Activar isLoading al comenzar la carga

    dispatch(getUsersAdmin({ headers }))
      .then(() => setIsLoading(false)) // Desactivar isLoading cuando la carga está completa
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanUsersAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra los usuarios basados en el término de búsqueda
    const filtered = users.filter(
      (user) => user.email.includes(term) || user.n_document.includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="container_tableUsers">
      <div className="search-container">
        <FaSearch className="icon_search_1" />
        <Form.Group controlId="searchTerm" className="mb-2">
          <Form.Control
            type="text"
            placeholder="Buscar por documento ó email"
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
              <th>ID documento</th>
              <th>Tipo persona</th>
              <th>Nombres</th>
              <th>Apellidos</th>
              <th>Razon social</th>
              <th>Correo electronico</th>
              <th>Telefono</th>
              <th>Estado</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm === ''
              ? // Si el término de búsqueda está vacío, renderizar todos los usuarios
                users.map((user, index) => {
                  const userStatus = user.active ? 'activo' : 'inactivo';
                  const personType = user.person_type === "Person" ? "Persona" : "Compañia"
                  let userRol;

                  switch (user.id_role) {
                    case 1:
                      userRol = 'Usuario';
                      break;
                    case 2:
                      userRol = 'Cajero';
                      break;
                    case 3:
                      userRol = 'Admin';
                      break;
                    case 4:
                      userRol = 'SuperAdmin';
                      break;
                    default:
                      userRol = 'Desconocido';
                  }

                  return (
                    <tr key={index}>
                      <td>{user.n_document}</td>
                      <td>{personType}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.nameCompany}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{userStatus}</td>
                      <td>{userRol}</td>
                      <td>
                        <FaEdit
                          onClick={() => handleEdit(user)}
                          className="icon_edit"
                          title="Modificar info"
                        />
                      </td>
                    </tr>
                  );
                })
              : // Si hay un término de búsqueda, renderizar los usuarios filtrados
                filteredUsers.map((user, index) => {
                  const userStatus = user.active ? 'activo' : 'inactivo';
                  const personType = user.person_type === "Person" ? "Persona" : "Compañia"
                  let userRol;

                  switch (user.id_role) {
                    case 1:
                      userRol = 'Usuario';
                      break;
                    case 2:
                      userRol = 'Cajero';
                      break;
                    case 3:
                      userRol = 'Admin';
                      break;
                    case 4:
                      userRol = 'SuperAdmin';
                      break;
                    default:
                      userRol = 'Desconocido';
                  }

                  return (
                    <tr key={index}>
                      <td>{user.n_document}</td>
                      <td>{personType}</td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.nameCompany}</td>
                      <td>{user.email}</td>
                      <td>{user.phone}</td>
                      <td>{userStatus}</td>
                      <td>{userRol}</td>
                      <td>
                        <FaEdit
                          onClick={() => handleEdit(user)}
                          style={{
                            cursor: 'pointer',
                            marginRight: '10px',
                            marginLeft: '10px',
                            color: 'blue',
                          }}
                          title="Modificar info"
                        />
                      </td>
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      )}
      {selectedUser && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              <h2>
                Editar información del usuario con ID: {selectedUser.n_document}
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProfile user={selectedUser} setShowModal={setShowModal} />
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

export default Users;
