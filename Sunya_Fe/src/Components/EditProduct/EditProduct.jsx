import { useState } from 'react';
import { Card, Form, Button, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import "./editproduct.css"
import {
  cleanProductsAdmin,
  editProductInfoAdmin,
  getProductsAdmin,
} from '../../Redux/Actions/actions';

import { useEffect } from 'react';

const EditProduct = ({ product, setShowModal }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const productStatus = product.active ? 'activo' : 'inactivo';
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newName, setNewName] = useState(product.name);
  const [newSlug, setNewSlug] = useState(product.slug);
  const [newImage, setNewImage] = useState(product.image);
  const [newBrand, setNewBrand] = useState(product.brand);
  const [newDescription, setNewDescription] = useState(product.description);
  const [newPrice, setNewPrice] = useState(product.price);
  const [newCountInStock, setNewCountInStock] = useState(product.countInStock);

  useEffect(() => {
    return () => {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      dispatch(getProductsAdmin({headers}));
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

  const handleUpdateProduct = async () => {
    const updatedData = {
      id: product.id,
      name: newName,
      slug: newSlug,
      image: newImage,
      brand: newBrand,
      description: newDescription,
      price: parseFloat(newPrice).toFixed(2),
      countInStock: parseFloat(newCountInStock)
    };

    try {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      const response = await dispatch(
        editProductInfoAdmin({ headers, updatedData })
      );
      if (response.success) {
        dispatch(cleanProductsAdmin());
        setEditMode(false); // Desactiva el modo de edición después de la actualización
        setShowModal(false);
        history.push('/admin/products');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="w-75 mx-auto">
      <Card.Body>
        <Card.Title>Editar información producto</Card.Title>
        {!editMode ? (
          <>
            {/* Mostrar detalles del perfil */}
            <Card.Text>
              <Image src={product.image} thumbnail className='image_edit' />
            </Card.Text>
            <Card.Text>
              <strong>Nombre:</strong> {product.name}
            </Card.Text>
            <Card.Text>
              <strong>Presentacion:</strong> {product.slug}
            </Card.Text>
            
            <Card.Text>
              <strong>Marca:</strong> {product.brand}
            </Card.Text>
            <Card.Text>
              <strong>Descripción:</strong> {product.description}
            </Card.Text>
            <Card.Text>
              <strong>Precio:</strong> {product.price}
            </Card.Text>
            <Card.Text>
              <strong>Cantidad stock:</strong> {product.countInStock}
            </Card.Text>
            <Button variant="primary" onClick={() => setEditMode(true)}>
              <FaEdit /> Editar Producto
            </Button>
          </>
        ) : (
          <Form>
            <Row>
              {/* Columna 1: Campos de texto */}
              <Form.Group >
          <Form.Label><strong>Imagen</strong></Form.Label>
          <Form.Control
            type="file"
            name="file"
            onChange={upLoadImage}
            placeholder="Sube tu imagen aquí"
          />
          {loading ? (
            <p>Cargando imagen...</p>
          ) : (
            <Image src={newImage} thumbnail className='image_edit' />
          )}
        </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label><strong>Nombre</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo nombre"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formSlug">
                <Form.Label><strong>Presentacion</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nueva presentacion"
                  value={newSlug}
                  onChange={(e) => setNewSlug(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formBrand">
                <Form.Label><strong>Marca</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nueva marca"
                  value={newBrand}
                  onChange={(e) => setNewBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label><strong>Descripción</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nueva descripción"
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label><strong>Precio</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nuevo precio"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="formCountInStock">
                <Form.Label><strong>Cantidad stock</strong></Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nueva cantidad"
                  value={newCountInStock}
                  onChange={(e) => setNewCountInStock(e.target.value)}
                />
                 
              </Form.Group>
            </Row>
            {/* Botones de acción */}
            <Button
              variant="success"
              onClick={handleUpdateProduct}
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

export default EditProduct;
