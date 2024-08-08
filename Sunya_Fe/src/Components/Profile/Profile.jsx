import { useState } from 'react';
import { Card, Form, Button } from 'react-bootstrap';
import './profile.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { cleanDetailUser, cleanReviews,  editUser } from '../../Redux/Actions/actions';

const Profile = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const [editMode, setEditMode] = useState(false);
  const [newPhone, setNewPhone] = useState(userInfo?.user?.phone);
  const [newCity, setNewCity] = useState(userInfo?.user?.city);
  const [newEmail, setNewEmail] = useState(userInfo?.user?.email);
  const [newPassword, setNewPassword] = useState('');

  const handleUpdateProfile = async () => {
    const updatedData = {
      n_document: userInfo.user.id,
      phone: newPhone,
      city: newCity,
      password: newPassword,
      email: newEmail,
    };
    try {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await dispatch(
        editUser({ headers, updatedData })
      );
      if (response.success) {
        dispatch(cleanDetailUser());
        //dispatch(cleanReviews());
        setEditMode(false); // Desactiva el modo de edición después de la actualización
        history.push('/login');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <Card>
      <Card.Body>
        <Card.Title>Perfil {userInfo?.user?.name}</Card.Title>
        {!editMode ? (
          <>
            <Card.Text>
              <strong>Nombre:</strong> {userInfo?.user?.name}
            </Card.Text>
            <Card.Text>
              <strong>Teléfono:</strong> {userInfo?.user?.phone}
            </Card.Text>
            <Card.Text>
              <strong>Ciudad:</strong> {userInfo?.user?.city}
            </Card.Text>
            <Card.Text>
              <strong>Email:</strong> {userInfo?.user?.email}
            </Card.Text>
            <Button variant="primary" onClick={() => setEditMode(true)}>
              Editar Perfil
            </Button>
          </>
        ) : (
          <Form>
            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Teléfono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nuevo teléfono"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>Ciudad</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese su nueva ciudad"
                value={newCity}
                onChange={(e) => setNewCity(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="Ingrese su nuevo correo"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
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
            <Form.Group>
              <p className="message_edit">
                * Al guardar los cambios, la sesión se cerrará. Por favor,
                inicie sesión nuevamente para ver los cambios actualizados. Si
                cambio contraseña y/o correo, recuerde iniciar sesion con los
                nuevos datos
              </p>
            </Form.Group>
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

export default Profile;
