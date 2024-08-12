import { useState } from 'react';
import { Card, Form, Button, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import {
  cleanPartnersAdmin,
  editPartnerInfoAdmin,
  getPartnersAdmin,
} from '../../Redux/Actions/actions';

import { useEffect } from 'react';

const EditPartner = ({ partner, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(partner.name);
  const [newAddress, setNewAddress] = useState(partner.address);
  const [newImage, setNewImage] = useState(partner.image);
  const [newCity, setNewCity] = useState(partner.city);
  const [newCountry, setNewCountry] = useState(partner.country);
  const [newPhone, setNewPhone] = useState(partner.phone);

  useEffect(() => {
    return () => {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      dispatch(getPartnersAdmin({ headers }));
    };
  }, [dispatch, userInfo]);

  const upLoadImage = async (e) => {
    const files = e.target.files;

    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'Sunya7754');
    setLoading(true);
    // Obtenemos la URL de la imagen de la respuesta de Cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/djkq5h1et/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await response.json();
    const imageURL = file.secure_url;

    setNewImage(imageURL);

    setLoading(false);
  };

  const handleUpdatePartner = async () => {
    const updatedData = {
      id: partner.id,
      name: newName,
      address: newAddress,
      image: newImage,
      city: newCity,
      country: newCountry,
      phone: newPhone,
    };

    try {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await dispatch(
        editPartnerInfoAdmin({ headers, updatedData })
      );
      if (response.success) {
        dispatch(cleanPartnersAdmin());
        setEditMode(false); // Desactiva el modo de edición después de la actualización
        setShowModal(false);
        history.push('/admin/partners');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="w-75 mx-auto">
      <Card.Body>
        <Card.Title>Editar información tienda aliada</Card.Title>
        {!editMode ? (
          <>
            {/* Mostrar detalles del perfil */}
            <Card.Text>
              <Image src={partner.image} thumbnail className="image_edit" />
            </Card.Text>
            <Card.Text>
              <strong>Nombre:</strong> {partner.name}
            </Card.Text>
            <Card.Text>
              <strong>Dirección:</strong> {partner.address}
            </Card.Text>
            <Card.Text>
              <strong>Municipio:</strong> {partner.city}
            </Card.Text>
            <Card.Text>
              <strong>Departamento:</strong> {partner.country}
            </Card.Text>
            <Card.Text>
              <strong>Teléfono:</strong> {partner.phone}
            </Card.Text>
            <Button variant="primary" onClick={() => setEditMode(true)}>
              <FaEdit /> Editar información
            </Button>
          </>
        ) : (
          <Form>
            <Row>
              {/* Columna 1: Campos de texto */}
              <Form.Group>
                <Form.Label>
                  <strong>Imagen</strong>
                </Form.Label>
                <Form.Control
                  type="file"
                  name="file"
                  onChange={upLoadImage}
                  placeholder="Sube tu imagen aquí"
                />
                {loading ? (
                  <p>Cargando imagen...</p>
                ) : (
                  <Image src={newImage} thumbnail className="image_edit" />
                )}
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>
                  <strong>Nombre</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo nombre"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>
                  <strong>Dirección</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nueva dirección"
                  value={newAddress}
                  onChange={(e) => setNewAddress(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>
                  <strong>Municipio</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo municipio"
                  value={newCity}
                  onChange={(e) => setNewCity(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <Form.Label>
                  <strong>Departamento</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo departamento"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>
                  <strong>Teléfono</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo teléfono"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                />
              </Form.Group>
            </Row>
            {/* Botones de acción */}
            <Button
              variant="success"
              onClick={handleUpdatePartner}
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

export default EditPartner;
