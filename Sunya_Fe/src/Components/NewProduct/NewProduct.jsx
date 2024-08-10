import { useState } from 'react';
import { Card, Form, Button, Row, Image } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Swal from 'sweetalert2';
import {
  cleanProductsAdmin,
  getProductsAdmin,
  postNewProduct,
} from '../../Redux/Actions/actions';
import { logoA } from '../Image/Image';
import { useEffect } from 'react';
import {
  cleanAccountGroup,
  cleanTaxes,
  createProductSiigo,
  getAccountGroup,
  getTaxes,
} from '../../Redux/ActionsSiigo/actionsSiigo';

const NewProduct = ({ setShowModalA }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const accounts = useSelector((state) => state.accounts);
  const taxes = useSelector((state) => state.taxes);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [code, setCode] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [countInStock, setCountInStock] = useState('');
  const [account, setAccount] = useState('');
  const [idTax, setIdTax] = useState(0);
  const [type, setType] = useState('');
  const [currencyCode, setCurrencyCode] = useState('');
  const [position, setPosition] = useState('');
  const [unid, setUnid] = useState('');
  const [stockControl, setStockControl] = useState(false);
  const [taxClassification, setTaxClassification] = useState('');
  const [taxIncluded, setTaxIncluded] = useState(false);
  const [taxConsumptionValue, setTaxConsumptionValue] = useState(0);
  const [tariff, setTariff] = useState('');

  useEffect(() => {
    const generateCode = () => {
      const randomPart = Math.floor(Math.random() * 100000);
      return `L7M-${randomPart}`;
    };
    setCode(generateCode());
    dispatch(getAccountGroup());
    dispatch(getTaxes(/*{headers}*/));

    return () => {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };
      dispatch(getProductsAdmin({ headers }));
      dispatch(cleanAccountGroup());
      dispatch(cleanTaxes());
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

    setImage(imageURL);

    setLoading(false);
  };

  const handleDateProduct = async () => {
    const data = {
      idTax: idTax,
      type: type,
      code: code,
      name: name,
      slug: slug,
      image: image,
      brand: brand,
      account: account,
      description: description,
      price: parseFloat(price).toFixed(2),
      countInStock: parseFloat(countInStock),
      currencyCode: currencyCode,
      position: position,
      unid: unid,
      stockControl: stockControl,
      taxClassification: taxClassification,
      taxIncluded: taxIncluded,
      taxConsumptionValue: taxConsumptionValue,
      tariff: tariff,
    };

    try {
      const token = userInfo.token;
      const headers = { Authorization: `Bearer ${token}` };

      const responseA = await dispatch(createProductSiigo(headers, data));
      if (responseA.success) {
        const response = await dispatch(postNewProduct(headers, data));
        if (response.success) {
          Swal.fire({
            icon: 'success',
            title: '¡Éxito!',
            text: '¡Producto creado correctamente. Enlazado con SIIGO!.',
          });
          dispatch(cleanProductsAdmin());
          setEditMode(false);
          setShowModalA(false);
          history.push('/admin/products');
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'La creacion del producto NO fue exitosa, verifique parametros intente nuevamente',
        });
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="w-85 mx-auto">
      <Card.Body>
        <Card.Title>Informacion nuevo producto</Card.Title>
        {!editMode ? (
          <>
            {/* Mostrar detalles del perfil */}
            <Card.Text>
              <Image src={logoA} thumbnail className="image_edit" />
            </Card.Text>

            <Button variant="primary" onClick={() => setEditMode(true)}>
              <FaEdit /> Crear Producto
            </Button>
          </>
        ) : (
          <Form>
            <Row>
              {/* Columna 1: Campos de texto */}
              <Form.Group>
                <Form.Label>
                  <strong>Imagen *</strong> <span className="required-field">(campo obligatorio)</span>
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
                  <strong>Codigo</strong>
                </Form.Label>
                <Form.Control type="text" value={code} readOnly />
              </Form.Group>

              <Form.Group controlId="formAccount">
                <Form.Label>
                  <strong>Grupo Inventario SIIGO *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={account}
                  onChange={(e) => setAccount(e.target.value)}
                  className="form-control-lg"
                  required
                >
                  <option value="">Selecciona una cuenta</option>
                  {accounts.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formType">
                <Form.Label>
                  <strong>Tipo del producto</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Product">Producto</option>
                  <option value="Service">Servicio</option>
                  <option value="ConsumerGood">Consumo</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formName">
                <Form.Label>
                  <strong>Nombre *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nombre nuevo producto"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formSlug">
                <Form.Label>
                  <strong>Presentacion *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese nueva presentacion"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formUnid">
                <Form.Label>
                  <strong>Medida</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={unid}
                  onChange={(e) => setUnid(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="94">Unidad</option>
                  <option value="13">Ración</option>
                  <option value="23">gramo por centímetro cúbico</option>
                  <option value="25">gramo por centímetro cuadrado</option>
                  <option value="26">tonelada real</option>
                  <option value="28">kilogramo por metro cuadrado</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formBrand">
                <Form.Label>
                  <strong>Marca *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese marca nuevo producto"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formDescription">
                <Form.Label>
                  <strong>Descripción * </strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese descripción nuevo producto"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPrice">
                <Form.Label>
                  <strong>Precio sin IVA *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese precio nuevo producto sin IVA"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formCurrencyCode">
                <Form.Label>
                  <strong>Tipo de Moneda</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={currencyCode}
                  onChange={(e) => setCurrencyCode(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="COP">COP - Pesos Colombianos</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPosition">
                <Form.Label>
                  <strong>Clasificación tributaria</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={taxClassification}
                  onChange={(e) => setTaxClassification(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Taxed">Gravado</option>
                  <option value="Exempt">Exento</option>
                  <option value="Excluded">Excluido</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPosition">
                <Form.Label>
                  <strong>IVA incluido</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={taxIncluded}
                  onChange={(e) => setTaxIncluded(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="true">SI</option>
                  <option value="false">NO</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formTaxConsumptionValue">
                <Form.Label>
                  <strong>Valor impuesto al consumo</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="number"
                  value={taxConsumptionValue}
                  onChange={(e) => setTaxConsumptionValue(e.target.value)}
                  
                />
              </Form.Group>

              <Form.Group controlId="formIdTax">
                <Form.Label>
                  <strong>Impuesto *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={idTax}
                  onChange={(e) => setIdTax(e.target.value)}
                  className="form-control-lg"
                  required
                >
                  <option value="">Selecciona una opción</option>
                  {taxes.map((acc) => (
                    <option key={acc.id} value={acc.id}>
                      {acc.name}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formPosition">
                <Form.Label>
                  <strong>Identificador lista de precios *</strong> <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="formStockControl">
                <Form.Label>
                  <strong>Control Inventario</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="select"
                  value={stockControl}
                  onChange={(e) => setStockControl(e.target.value)}
                  className="form-control-lg"
                  
                >
                  <option value="">Selecciona una opción</option>
                  <option value="true">SI</option>
                  <option value="false">NO</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formCountInStock">
                <Form.Label>
                  <strong>Cantidad stock</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Ingrese cantidad stock nuevo producto"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group controlId="formCountInStock">
                <Form.Label>
                  <strong>Código arancelario</strong> <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={tariff}
                  onChange={(e) => setTariff(e.target.value)}
                 
                />
              </Form.Group>
            </Row>
            {/* Botones de acción */}
            <Button
              variant="success"
              onClick={handleDateProduct}
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

export default NewProduct;
