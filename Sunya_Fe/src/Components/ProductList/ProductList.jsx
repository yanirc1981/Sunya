import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { cleanProductsAdmin, getProductsAdmin, updateProductStatus } from '../../Redux/Actions/actions';
import { Image, Modal, Spinner, Table } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import ToggleButton from '../ToggleButton';
import EditProduct from '../EditProduct/EditProduct';
import './productlist.css';
import NewProduct from '../NewProduct/NewProduct';

//import { PiTrashDuotone } from 'react-icons/pi';

export default function ProductList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createdProduct, setCreatedProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [error, setError] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.productsAdmin);
 

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    dispatch(getProductsAdmin({headers}))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(cleanProductsAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  

  const createHandler = async () => {
    setCreatedProduct(true)
    setShowModalA(true);
  };

  const handleCloseModalA = () => {
    setCreatedProduct(false);
    setShowModalA(false);
  };

  const upDateHandler = async (product) => {
    const updatedData = {
      active: !product.active,
      id: product.id
    };
    
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await dispatch(updateProductStatus({headers, updatedData}));
    if(response.success){
      await dispatch(cleanProductsAdmin())
      await dispatch(getProductsAdmin({headers}))
    }
  };

  return (
    <div>
      <Row>
        <Col>
          <h2>Productos Fabrica</h2>
        </Col>
        <Col className="col text-end">
          <div>
            <Button type="button" onClick={createHandler}>
              <MdAddCircle /> Crear producto
            </Button>
          </div>
        </Col>
      </Row>

      {loadingCreate && <LoadingBox></LoadingBox>}
      {loadingDelete && <LoadingBox></LoadingBox>}

      {loading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          <Table responsive className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                <th>ID</th>
                <th>CODIGO SIIGO</th>
                <th>IMAGEN</th>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>PRESENTACION</th>
                <th>STOCK EN FABRICA</th>
                <th>ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.code}</td>
                  <td>
                    <Image
                      src={product.image}
                      roundedCircle
                      className="image_product"
                    />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.slug}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <Button
                      type="button"
                      variant="light"
                      title="Editar"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit className="icon_edit" />
                    </Button>
                    &nbsp;
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => upDateHandler(product)}
                    >
                      <ToggleButton
                      status={product.active}
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              <h2>
                Editar información del producto con ID: {selectedProduct.id}
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditProduct
              product={selectedProduct}
              setShowModal={setShowModal}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      {createdProduct && (
        <Modal show={showModalA} onHide={handleCloseModalA}>
          <Modal.Header closeButton>
            <Modal.Title>
              {' '}
              <h2>
                Formulario nuevo producto
              </h2>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <NewProduct
            setShowModalA={setShowModalA}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModalA}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
