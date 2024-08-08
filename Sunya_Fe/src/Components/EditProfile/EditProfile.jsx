import { useState } from 'react';
import { Card, Form, Button, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import './editprofile.css';
import {
  cleanUsersAdmin,
  editUserInfoAdmin,
  getUsersAdmin,
} from '../../Redux/Actions/actions';

import { useEffect } from 'react';

const EditProfile = ({ user, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const userStatus = user.active ? 'activo' : 'inactivo';
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
  const [editMode, setEditMode] = useState(false);
  const [newPhone, setNewPhone] = useState(user.phone);
  const [newCity, setNewCity] = useState(user.city_code);
  const [newState, setNewState] = useState(user.state_code)
  const [newEmail, setNewEmail] = useState(user.email);
  const [newEstado, setNewEstado] = useState(userStatus);
  const [newPassword, setNewPassword] = useState('');
  const [newRol, setNewRol] = useState(userRol);

  useEffect(() => {
    return () => {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      dispatch(getUsersAdmin({ headers }));
    };
  }, [dispatch, userInfo]);

  const handleUpdateProfile = async () => {
    let idRole;

    // Asigna el id_rol correspondiente según el valor de newRol
    switch (newRol) {
      case 'Usuario':
        idRole = 1;
        break;
      case 'Cajero':
        idRole = 2;
        break;
      case 'Admin':
        idRole = 3;
        break;
      case 'SuperAdmin':
        idRole = 4;
        break;
      default:
        idRole = null; // Si newRol no coincide con ninguno de los valores especificados
    }
    const updatedData = {
      id: user.id,
      phone: newPhone,
      city_code: newCity,
      state_code: newState,
      password: newPassword,
      email: newEmail,
      active: newEstado === 'activo' ? true : false,
      id_role: idRole,
    };

    try {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await dispatch(
        editUserInfoAdmin({ headers, updatedData })
      );
      if (response.success) {
        dispatch(cleanUsersAdmin());
        setEditMode(false); // Desactiva el modo de edición después de la actualización
        setShowModal(false);
        history.push('/admin/users');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="w-75 mx-auto">
      <Card.Body>
        <Card.Title>Editar informacion usuario</Card.Title>
        {!editMode ? (
          <>
            {/* Mostrar detalles del perfil */}
            <Card.Text>
              <strong>Nombres:</strong> {user.first_name}
            </Card.Text>
            <Card.Text>
              <strong>Apellidos:</strong> {user.last_name}
            </Card.Text>
            <Card.Text>
              <strong>Razón Social:</strong> {user.nameCompany}
            </Card.Text>
            <Card.Text>
              <strong># Documento:</strong> {user.n_document}
            </Card.Text>
            <Card.Text>
              <strong>Correo electrónico:</strong> {user.email}
            </Card.Text>
            <Card.Text>
              <strong>Teléfono:</strong> {user.phone}
            </Card.Text>
            <Card.Text>
              <strong>Fecha creacion:</strong> {user.createdAt}
            </Card.Text>
            <Card.Text>
              <strong>Estado:</strong> {userStatus}
            </Card.Text>
            <Card.Text>
              <strong>Rol:</strong> {userRol}
            </Card.Text>
            <Button variant="primary" onClick={() => setEditMode(true)}>
              <FaEdit /> Editar Perfil
            </Button>
          </>
        ) : (
          <Form>
            <Row>
              {/* Columna 1: Campos de texto */}

              <Form.Group controlId="formPhone">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo teléfono"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>Ciudad ó Municipio</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Ingrese nueva ciudad"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                  >
                   <option value="">Selecciona una opción</option>
                  <option value="50006">Acacías - Meta</option>
                  <option value="85010">Aguazul - Casanare</option>
                  <option value="50110">Barranca De Upía - Meta</option>
                  <option value="05088">Bello - Antioquía</option>
                  <option value="11001">Bogotá - Bogotá D.C</option>
                  <option value="50124">Cabuyaro - Meta</option>
                  <option value="25126">Cajicá - Cundinamarca</option>
                  <option value="95015">Calamar - Guaviare</option>
                  <option value="25151">Caqueza - Cundinamarca</option>
                  <option value="50150">Castilla La Nueva - Meta</option>
                  <option value="50223">Cubarral - Meta</option>
                  <option value="50226">Cumaral - Meta</option>
                  <option value="50245">El Calvario - Meta</option>
                  <option value="50251">El Castillo - Meta</option>
                  <option value="50270">El Dorado - Meta</option>
                  <option value="50287">Fuente De Oro - Meta</option>
                  <option value="50313">Granada - Meta</option>
                  <option value="50318">Guamal - Meta</option>
                  <option value="73001">Ibagué - Tolima</option>
                  <option value="05360">Itagui - Antioquia</option>
                  <option value="25377">La Calera - Cundinamarca</option>
                  <option value="50350">La Macarena - Meta</option>
                  <option value="50400">Lejanías - Meta</option>
                  <option value="85139">Maní - Casanare</option>
                  <option value="50325">Mapiripán - Meta</option>
                  <option value="05001">Medellín - Antioqua</option>
                  <option value="25438">Medina - Cundinamarca</option>
                  <option value="50330">Mesetas - Meta</option>
                  <option value="19001">Popayan - Cauca</option>
                  <option value="50450">Puerto Concordia - Meta</option>
                  <option value="50568">Puerto Gaitán - Meta</option>
                  <option value="50577">Puerto Lleras - Meta</option>
                  <option value="50573">Puerto López - Meta</option>
                  <option value="50590">Puerto Rico - Meta</option>
                  <option value="50606">Restrepo - Meta</option>
                  <option value="50680">San Carlos De Guaroa - Meta</option>
                  <option value="50683">San Juan De Arama - Meta</option>
                  <option value="50686">San Juanito - Meta</option>
                  <option value="50689">San Martín - Meta</option>
                  <option value="50370">Uribe - Meta</option>
                  <option value="50001">Villavicencio - Meta</option>
                  <option value="50711">Vistahermosa - Meta</option>  
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formState">
                <Form.Label>Departamento</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Ingrese nuevo Departamento"
                  value={newState}
                  onChange={(e) => setNewCity(e.target.value)}
                  >
                  <option value="">Selecciona una opción</option>
                  <option value="05">Antioquía</option>
                  <option value="91">Amazonas</option>
                  <option value="81">Arauca</option>
                  <option value="08">Atlántico</option>
                  <option value="11">Bogotá D.C</option>
                  <option value="13">Bolivar</option>
                  <option value="15">Boyacá</option>
                  <option value="17">Caldas</option>
                  <option value="19">Cauca</option>
                  <option value="85">Casanare</option>
                  <option value="20">Cesar</option>
                  <option value="23">Córdoba</option>
                  <option value="25">Cundinamarca</option>
                  <option value="27">Chocó</option>
                  <option value="94">Guainía</option>
                  <option value="95">Guaviare</option>
                  <option value="41">Huila</option>
                  <option value="44">La Guajira</option>
                  <option value="47">Magdalena</option>
                  <option value="50">Meta</option>
                  <option value="52">Nariño</option>
                  <option value="54">Norte de Santander</option>
                  <option value="86">Putumayo</option>
                  <option value="63">Quindio</option>
                  <option value="66">Risaralda</option>
                  <option value="68">Santander</option>
                  <option value="70">Sucre</option>
                  <option value="73">Tolima</option>
                  <option value="76">Valle del Cauca</option>
                  <option value="97">Vaupés</option>
                  <option value="99">Vichada</option>  
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="formPassword">
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ingrese nueva contraseña"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formEstado">
                <Form.Label>Estado</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Ingrese nuevo email"
                  value={newEstado}
                  onChange={(e) => setNewEstado(e.target.value)}
                >
                  <option value="activo">Activo</option>
                  <option value="inactivo">Inactivo</option>
                </Form.Select>
              </Form.Group>
              <Form.Group controlId="formRol">
                <Form.Label>Rol</Form.Label>
                <Form.Select
                  type="text"
                  placeholder="Ingrese nuevo email"
                  value={newRol}
                  onChange={(e) => setNewRol(e.target.value)}
                >
                  <option value="Usuario">Usuario</option>
                  <option value="Cajero">Cajero</option>
                  <option value="Admin">Admin</option>
                  <option value="SuperAdmin">SuperAdmin</option>
                </Form.Select>
              </Form.Group>
            </Row>
            {/* Botones de acción */}
            <Button
              variant="success"
              onClick={handleUpdateProfile}
              className="button_edit"
            >
              Guardar Cambios
            </Button>
            <Button
              variant="secondary"
              onClick={() => setEditMode(false)}
              className="button_edit"
            >
              Cancelar
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default EditProfile;
