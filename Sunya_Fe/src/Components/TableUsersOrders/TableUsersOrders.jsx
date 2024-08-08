import { useDispatch, useSelector } from 'react-redux';
import {
  cleanUsersOrders,
  getOrderById,
  getOrdersUsers,
} from '../../Redux/Actions/actions';
import { useEffect, useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table, Spinner, Form, Button, Modal } from 'react-bootstrap';
import { FaSearch, FaRedoAlt } from 'react-icons/fa';
import { MdInfo, MdSend } from 'react-icons/md';
import './tableusersbookings.css';
import {
  cleanCostCenters,
  cleanTypeInvoiceSiigo,
  cleanUsers,
  getCostCenters,
  getTypeInvoiceSiigo,
  getUsersSiigo,
  postGenerateInvoice,
} from '../../Redux/ActionsSiigo/actionsSiigo';
import Swal from 'sweetalert2';

const TableUsersOrders = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const orders = useSelector((state) => state.usersOrders);
  const typeInvoices = useSelector((state) => state.typeInvoices);
  const usersSiigo = useSelector((state) => state.usersSiigo);
  const costCenters = useSelector((state) => state.costCenters);
  const userInfo = useSelector((state) => state.userInfo);
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [invoiceType, setInvoiceType] = useState('');
  const [sendToDian, setSendToDian] = useState(false);
  const [sendToEmail, setSendToEmail] = useState(false);
  const [sendToCostCenters, setSendToCostCenters] = useState(0);
  const [sendToCommentsInvoice, setSendToCommentsInvoice] = useState('');
  const [sendToUser, setSendToUser] = useState('');
  const maxLength = 4000;

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    setIsLoading(true);
    dispatch(getOrdersUsers({ headers }))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanUsersOrders());
    };
  }, [dispatch, userInfo]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filtra los usuarios basados en el término de búsqueda
    const filtered = orders.filter((order) => {
      const ordersStatus = order.active ? 'pedido activo' : 'pedido cancelado';
      const statusPay = order.isPaid ? 'Pagado' : 'No registra pago';
      const statusDelivered = order.isDelivered
        ? 'Despachado'
        : 'No registra envio';
      return (
        order.id.toString().includes(term) ||
        order.n_document.toString().includes(term) ||
        statusPay.includes(term) ||
        statusDelivered.includes(term) ||
        ordersStatus.includes(term)
      );
    });
    setFilteredOrders(filtered);
  };

  const handleClick = async (orderId) => {
    try {
      const response = await dispatch(getOrderById({ orderId, headers }));

      if (response.success) {
        history.push(`/orderstore/${orderId}`);
      } else {
        // Manejar el caso de error
        setError('Failed to fetch order details');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleShowModal = (orderId) => {
    dispatch(getTypeInvoiceSiigo(/*headers*/));
    dispatch(getCostCenters());
    dispatch(getUsersSiigo());
    setCurrentOrderId(orderId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    dispatch(cleanTypeInvoiceSiigo());
    dispatch(cleanCostCenters());
    dispatch(cleanUsers());
    setShowModal(false);
    setCurrentOrderId(null);
    setInvoiceType('');
    setSendToDian(false);
    setSendToEmail(false);
    setSendToCostCenters(0);
    setSendToCommentsInvoice('');
    setSendToUser('');
  };

  const handleGenerateInvoice = async () => {
    const info = {
      orderId: currentOrderId,
      invoiceType,
      sendToDian,
      sendToEmail,
      sendToCostCenters,
      sendToCommentsInvoice,
      sendToUser,
    };

    try {
      const response = await dispatch(postGenerateInvoice(info, headers));
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Factura generada!.',
        });
        handleCloseModal();
        history.push('/admin/invoices_list');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo generar la factura. Intentelo nuevamente',
        });
      }
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El inicio de sesión NO fue exitoso. Verifique email y password.',
      });
    }
  };

  const isCostCenterFieldVisible = () => {
    const selectedType = typeInvoices.find((type) => type.id === invoiceType);
    return selectedType ? selectedType.cost_center : false;
  };

  const isSendStampFieldVisible = () => {
    const selectedType = typeInvoices.find((type) => type.id === invoiceType);

    return selectedType?.electronic_type == 'NoElectronic' ? true : false;
  };

  return (
    <div className="container_admin_bookings">
      <div className="search-container">
        <FaSearch className="icon_search_1" />
        <Form.Group controlId="searchTerm" className="mb-2">
          <Form.Control
            type="text"
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
              <th>ID</th>
              <th>FECHA PEDIDO</th>
              <th>ID VENDEDOR</th>
              <th>NOMBRE CLIENTE</th>
              <th>APELLIDO CLIENTE</th>
              <th>TOTAL</th>
              <th>METODO DE PAGO</th>
              <th>ESTADO PAGO</th>
              <th>FECHA PAGO</th>
              <th>DESPACHO</th>
              <th>ESTADO</th>
              <th>ID FACTURA SIIGO</th>
              <th>ACCIONES</th>
              <th>GENERAR DESPACHO</th>
              <th>FACTURA</th>
            </tr>
          </thead>
          <tbody>
            {searchTerm === ''
              ? orders.map((order, index) => {
                  const ordersStatus = order.active
                    ? 'pedido activo'
                    : 'pedido cancelado';
                  const statusPay = order.isPaid
                    ? 'Aprovado'
                    : 'No registra pago';
                  const statusDelivered = order.isDelivered
                    ? 'Despachado'
                    : 'No registra envio';
                  return (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.id}</td>
                      <td>{order.shippingAddress.first_name}</td>
                      <td>{order.shippingAddress.last_name}</td>
                      <td> $ {order.totalPrice.toFixed(2)}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{statusPay}</td>
                      <td>{order.paidAt}</td>
                      <td>{statusDelivered}</td>
                      <td>{ordersStatus}</td>
                      <td>{order.idInvoice}</td>
                      <td>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => handleClick(order.id)}
                        >
                          <MdInfo className="icon_edit" /> Detalles
                        </Button>
                      </td>

                      <td>
                        {!order.isDelivered && order.isPaid && (
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => handleClick(order.id)}
                          >
                            <MdSend className="icon_edit" /> Generar Despacho
                          </Button>
                        )}
                      </td>

                      <td>
                        {!order.isInvoice && order.isPaid && (
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => handleShowModal(order.id)}
                          >
                            <MdSend className="icon_edit" /> Facturar
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })
              : filteredOrders.map((order, index) => {
                  const ordersStatus = order.active
                    ? 'pedido activo'
                    : 'pedido cancelado';
                  const statusPay = order.isPaid
                    ? 'Pagado'
                    : 'No registra pago';
                  const statusDelivered = order.isDelivered
                    ? 'Despachado'
                    : 'No registra envio';

                  return (
                    <tr key={index}>
                      <td>{order.id}</td>
                      <td>{order.createdAt.substring(0, 10)}</td>
                      <td>{order.n_document}</td>
                      <td> $ {order.totalPrice.toFixed(2)}</td>
                      <td>{statusPay}</td>
                      <td>{statusDelivered}</td>
                      <td>{ordersStatus}</td>
                      <td>{order.idInvoice}</td>
                      <td>
                        <Button
                          type="button"
                          variant="light"
                          onClick={() => handleClick(order.id)}
                        >
                          <MdInfo className="icon_edit" /> Detalles
                        </Button>
                      </td>
                      {!order.isDelivered && order.isPaid && (
                        <td>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => handleClick(order.id)}
                          >
                            <MdSend className="icon_edit" /> Generar Despacho
                          </Button>
                        </td>
                      )}
                      {!order.isInvoice && order.isPaid && (
                        <td>
                          <Button
                            type="button"
                            variant="light"
                            onClick={() => handleShowModal(order.id)}
                          >
                            <MdSend className="icon_edit" /> Facturar
                          </Button>
                        </td>
                      )}
                    </tr>
                  );
                })}
          </tbody>
        </Table>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            Generar Factura pedido con ID # {currentOrderId}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="invoiceType">
              <Form.Label>
                <strong>Tipo de Factura *</strong>
              </Form.Label>{' '}
              <span className="required-field">(campo obligatorio)</span>
              <Form.Control
                as="select"
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value)}
                className="form-control-lg"
                required
              >
                <option value="">Seleccione una opción</option>
                {typeInvoices?.map((typeInvoice) => (
                  <option key={typeInvoice.id} value={typeInvoice.id}>
                    {typeInvoice.type}-{typeInvoice.name}-
                    {typeInvoice.electronic_type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            {isCostCenterFieldVisible() && (
              <>
                <Form.Group controlId="invoiceCost">
                  <Form.Label>
                    <strong>Centro de costo *</strong>
                  </Form.Label>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                  <Form.Control
                    as="select"
                    value={sendToCostCenters}
                    onChange={(e) => setSendToCostCenters(e.target.value)}
                    className="form-control-lg"
                    required
                  >
                    <option value="">Seleccione una opción</option>
                    {costCenters?.map((costCenter) => (
                      <option key={costCenter.id} value={costCenter.id}>
                        {costCenter.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </>
            )}
            <br />
            <Form.Group controlId="invoiceUser">
              <Form.Label>
                <strong>Vendedor asigando a la factura *</strong>
              </Form.Label>{' '}
              <span className="required-field">(campo obligatorio)</span>
              <Form.Control
                as="select"
                value={sendToUser}
                onChange={(e) => setSendToUser(e.target.value)}
                className="form-control-lg"
                required
              >
                <option value="">Seleccione una opción</option>
                {usersSiigo?.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.first_name} - {user.identification}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            {isSendStampFieldVisible() && (
              <>
                <h6>Seleccione si desea enviar la factura a la DIAN</h6>
                <Form.Group controlId="sendToDian">
                  <Form.Check
                    type="checkbox"
                    label="Enviar a la DIAN"
                    checked={sendToDian}
                    onChange={(e) => setSendToDian(e.target.checked)}
                  />
                </Form.Group>
              </>
            )}

            <br />

            <h6>Seleccione si desea enviar la factura al correo del cliente</h6>

            <Form.Group controlId="sendToEmail">
              <Form.Check
                type="checkbox"
                label="Enviar factura al correo del cliente"
                checked={sendToEmail}
                onChange={(e) => setSendToEmail(e.target.checked)}
              />
            </Form.Group>
            <br />

            <Form.Group controlId="comments">
              <Form.Label>
                <strong>Observaciones factura</strong>{' '}
                <span className="required-fieldA">(opcional)</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                cols="50"
                maxLength={maxLength}
                value={sendToCommentsInvoice}
                onChange={(e) => setSendToCommentsInvoice(e.target.value)}
              />
              <p>
                {sendToCommentsInvoice.length}/{maxLength} caracteres
              </p>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cerrar
          </Button>
          <Button variant="primary" onClick={handleGenerateInvoice}>
            Generar Factura
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TableUsersOrders;
