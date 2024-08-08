import { useDispatch, useSelector } from 'react-redux';
import { cleanUsersOrders, getOrdersUsers } from '../../Redux/Actions/actions';
import { useEffect, useState } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import './tabledeliverys.css';

const TableDeliverys = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.usersOrders);
  const userInfo = useSelector((state) => state.userInfo);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredOrders, setFilteredOrders] = useState([]);

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
    const deliveredOrders = orders.filter((order) => order.isDelivered);
    setFilteredOrders(deliveredOrders);
  }, [orders]);

  return (
    <div className="container_admin_bookings">
      {isLoading ? (
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Cargando...</span>
        </Spinner>
      ) : (
        <Table responsive className="table table-hover table-striped">
          <thead className="thead-dark">
            <tr>
              <th>ID PEDIDO</th>
              <th>FECHA DESPACHO</th>
              <th># GUIA</th>
              <th>TRANSPORTADORA</th>
              <th>DIRECCION ENVIO</th>
              <th>TELEFONO CLIENTE</th>
              <th>NOMBRE CLIENTE</th>
              <th>DESTINO MUNICIPIO</th>
              <th>DESTINO DEPARTAMENTO</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
             
              <tr key={index}>
                 
                <td>{order.id}</td>
                <td>{order.delivery?.date.substring(0, 10)}</td>
                <td>{order.delivery?.numberGuide}</td>
                <td>{order.delivery?.transport}</td>
                <td>{order.delivery?.shippingAddress.address}</td>
                <td>{order.shippingAddress?.phone}</td>
                <td>{order.shippingAddress?.first_name + " " + order.shippingAddress?.last_name}</td> 
                <td>{order.delivery?.shippingAddressCity}</td>
                <td>{order.delivery?.shippingAddressCountry}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default TableDeliverys;
