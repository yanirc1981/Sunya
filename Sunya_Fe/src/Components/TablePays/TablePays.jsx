import { useDispatch, useSelector } from 'react-redux';
import { cleanUsersOrders, getOrdersUsers } from '../../Redux/Actions/actions';
import { useEffect, useState } from 'react';
import { Table, Spinner, Form, Button } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { FaFilter, FaTimes } from 'react-icons/fa'; 
import 'react-datepicker/dist/react-datepicker.css';
import './tablepays.css';

const TablePays = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.usersOrders);
  const userInfo = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);

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

  useEffect(() => {
    const deliveredOrders = orders.filter((order) => order.isPaid);
    setFilteredOrders(deliveredOrders);
  }, [orders]);

  const handleFilter = () => {
    let filtered = orders.filter((order) => order.isPaid);

    if (startDate && endDate) {
      filtered = filtered.filter((order) => {
        const orderDate = new Date(order.paidAt);
        const start = new Date(startDate.setHours(0, 0, 0, 0));
        const end = new Date(endDate.setHours(23, 59, 59, 999));
        return orderDate >= start && orderDate <= end;
      });
    }

    if (paymentMethod) {
      filtered = filtered.filter((order) => order.paymentMethod === paymentMethod);
    }

    setFilteredOrders(filtered);

    const total = filtered.reduce((acc, order) => acc + order.totalPrice, 0);
    setTotalAmount(total.toFixed(2));
  };

  const handleClearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    setPaymentMethod('');
    setFilteredOrders(orders.filter((order) => order.isPaid));
    setTotalAmount(0);
  };

  return (
    <div className="container_admin_tablepays">
      <Form className="filter-form">
        <Form.Group controlId="startDate">
          <Form.Label>Fecha de Inicio</Form.Label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            dateFormat="yyyy-MM-dd"
            isClearable
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="endDate">
          <Form.Label>Fecha de Fin</Form.Label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate}
            dateFormat="yyyy-MM-dd"
            isClearable
            className="form-control"
          />
        </Form.Group>

        <Form.Group controlId="paymentMethod">
          <Form.Label>Método de Pago</Form.Label>
          <Form.Control
            as="select"
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="form-control ml-2"
          >
            <option value="">TODOS</option>
            <option value="WompyBancolombia">WOMPYBANCOLOMBIA</option>
            <option value="Efectivo">EFECTIVO</option>
            <option value="Transferencia Bancaria">TRANSFERENCIA BANCARIA</option>
            <option value="Cheque">CHEQUE</option>
          </Form.Control>
        </Form.Group>

        <Button variant="primary" onClick={handleFilter}>
          Filtrar
        </Button>
        <Button variant="secondary" onClick={handleClearFilters}>
          <FaTimes /> Limpiar Filtros
        </Button>
      </Form>

      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <>
          <Table responsive className="table table-hover table-striped">
            <thead className="thead-dark">
              <tr>
                <th>ID PEDIDO</th>
                <th>FECHA PAGO</th>
                <th>METODO DE PAGO</th>
                <th># TRANSACCION</th>
                <th># CHEQUE</th>
                <th>VALOR PAGO</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index}>
                  <td>{order.id}</td>
                  <td>{order.paidAt.substring(0, 10)}</td>
                  <td>{order.paymentMethod}</td>
                  <td>{order.paymentResult?.transactionNumber || order.paymentResult?.transaction?.id || 'N/A'}</td>
                  <td>{order.paymentResult?.checkNumber ?? 'N/A'}</td>
                  <td>$ {parseFloat(order.totalPrice).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="total-amount">
            <h5>Total Ingreso: $ {parseFloat(totalAmount).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default TablePays;
