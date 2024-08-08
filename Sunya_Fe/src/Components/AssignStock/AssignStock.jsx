import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanInfoStores,
  cleanProducts,
  getProducts,
  getStores,
  postAssignStockStore,
} from '../../Redux/Actions/actions';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Form, Image, Row } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';


const AssignStock = () => {
  const dispatch = useDispatch();
  const history = useHistory()
  const products = useSelector((state) => state.products);
  const userInfo = useSelector((state) => state.userInfo);
  const token = userInfo.token;
  const headers = { Authorization: `Bearer ${token}` };
  const stores = useSelector((state) => state.stores);
  const [selectedStore, setSelectedStore] = useState('');
  const [productStocks, setProductStocks] = useState([]);

  useEffect(() => {
    const fetchStoresAndProducts = async () => {
      await dispatch(getProducts());
      await dispatch(getStores());
    };

    fetchStoresAndProducts();
    return () => {
      dispatch(cleanProducts());
      dispatch(cleanInfoStores());
    };
  }, [dispatch]);

  const handleStoreChange = (e) => {
    setSelectedStore(e.target.value);
  };

  const handleProductStockChange = (productId, value) => {
    const newValue = Math.max(0, value);
    const newProductStocks = productStocks.map((ps) =>
      ps.productId === productId ? { ...ps, stock: newValue } : ps
    );
    setProductStocks(newProductStocks);
  };

  const handleProductCheck = (productId) => {
    const productInList = productStocks.find(
      (ps) => ps.productId === productId
    );
    if (productInList) {
      setProductStocks(
        productStocks.filter((ps) => ps.productId !== productId)
      );
    } else {
      setProductStocks([...productStocks, { productId, stock: '' }]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      storeId: selectedStore,
      productStocks: productStocks.map((ps) => ({
        productId: ps.productId,
        stock: parseInt(ps.stock, 10),
      })),
    };

    console.log(data);
    try {
      const response = await dispatch(postAssignStockStore({ headers, data }));
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El stock en tienda asignado correctamente.',
        });
        setSelectedStore('');
        setProductStocks([]);
        history.push("/admin/dashboard")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
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

  return (
    <Container>
      <Row>
        <Card>
          <Card.Header>Asignar Stock a Tienda</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formStore">
                <Form.Label>Tienda</Form.Label>
                <Form.Control
                  as="select"
                  value={selectedStore}
                  onChange={handleStoreChange}
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
              <Form.Group controlId="formProducts" className="mt-3">
                <Form.Label>Productos</Form.Label>
                {products.map((product) => {
                  const productStock = productStocks.find(
                    (ps) => ps.productId === product.id
                  ) || { stock: '' };

                  return (
                    <div className="form-check mb-3" key={product.id}>
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id={`product-${product.id}`}
                        value={product.id}
                        checked={productStocks.some(
                          (ps) => ps.productId === product.id
                        )}
                        onChange={() => handleProductCheck(product.id)}
                      />
                      <Image
                        src={product.image}
                        roundedCircle
                        className="image_product"
                      />
                      <label
                        className="form-check-label"
                        htmlFor={`product-${product.id}`}
                      >
                        {product.name}
                      </label>
                      {productStocks.some(
                        (ps) => ps.productId === product.id
                      ) && (
                        <input
                          type="number"
                          className="form-control"
                          value={productStock.stock}
                          onChange={(e) =>
                            handleProductStockChange(product.id, e.target.value)
                          }
                          required
                        />
                      )}
                    </div>
                  );
                })}
              </Form.Group>

              <Button className="btn btn-primary" type="submit">
                Asignar Stock
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
};

export default AssignStock;
