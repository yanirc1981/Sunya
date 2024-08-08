import { useState, useEffect } from 'react';
import { Card, Form, Button, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import {
  cleanPartnersAdmin,
  getPartnersAdmin,
  postNewPartner,
} from '../../Redux/Actions/actions';
import { logoA } from '../Image/Image';

const NewPartner = ({ setShowModalA }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [phone, setPhone] = useState('');

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
    data.append('upload_preset', 'ozbamt8e');
    setLoading(true);
    // Obtenemos la URL de la imagen de la respuesta de Cloudinary
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/dmbkoargv/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );
    const file = await response.json();
    const imageURL = file.secure_url;

    setImage(imageURL);

    setLoading(false);
  };

  const handleDataPartner = async (e) => {
    e.preventDefault();
    if (name && address && image && city && country && phone) {
      const data = {
        name: name,
        address: address,
        image: image,
        city: city,
        country: country,
        phone: phone,
      };

      try {
        const token = userInfo.token;
        const headers = { Authorization: `Bearer ${token}` };
        const response = await dispatch(postNewPartner({ headers, data }));
        if (response.success) {
          dispatch(cleanPartnersAdmin());
          setEditMode(false);
          setShowModalA(false);
          history.push('/admin/partners');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      alert('Por favor, complete todos los campos.');
    }
  };

  return (
    <Card className="w-75 mx-auto">
      <Card.Body>
        <Card.Title>Informacion nueva tienda aliada</Card.Title>
        {!editMode ? (
          <>
            {/* Mostrar detalles del perfil */}
            <Card.Text>
              <Image src={logoA} thumbnail className="image_edit" />
            </Card.Text>

            <Button variant="primary" onClick={() => setEditMode(true)}>
              <FaEdit /> Crear Tienda Aliada
            </Button>
          </>
        ) : (
          <Form onSubmit={handleDataPartner}>
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
                  required
                />
                {loading ? (
                  <p>Cargando imagen...</p>
                ) : (
                  <Image src={image} thumbnail className="image_edit" />
                )}
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>
                  <strong>Nombre</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nombre tienda aliada"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formAddress">
                <Form.Label>
                  <strong>Dirección</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese dirección"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCity">
                <Form.Label>
                  <strong>Municipio</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese municipio"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCountry">
                <Form.Label>
                  <strong>Departamento</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese Departamento"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPhone">
                <Form.Label>
                  <strong>Teléfono</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </Form.Group>
            </Row>
            {/* Botones de acción */}
            <Button
              variant="success"
              type="submit"
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

export default NewPartner;
