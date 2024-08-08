import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import Button from 'react-bootstrap/Button';
import { cleanOrdersUser, getOrderById, getOrdersUser } from '../../Redux/Actions/actions';
import { MdInfo } from 'react-icons/md';

export default function OrderHistoryUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const isClient = userInfo?.user?.id_role === 1;
  const isAdmin = userInfo?.user?.id_role === 3;
  const isCashier = userInfo?.user?.id_role === 2;
  const orders = useSelector((state) => state.orders);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);

  useEffect(() => {
    dispatch(getOrdersUser({ headers }));
    return () => {
      dispatch(cleanOrdersUser())
    }
  }, [dispatch, headers]);

  const handleClick = async (orderId) => {
    try {
      
      const response = await dispatch(getOrderById({orderId, headers}));
      
      if (response.success) {
        if(isAdmin || isCashier) {
          history.push(`/orderStore/${orderId}`);
        } else {
          history.push(`/order/${orderId}`);
        }
        
      } else {
        // Manejar el caso de error
        setError('Failed to fetch order details');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };


  return (
    <div>
      <h1>Historial de pedidos</h1>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID PEDIDO</th>
              <th>FECHA PEDIDO</th>
              <th>TOTAL PEDIDO</th>
              <th>METODO PAGO</th>
              <th>FECHA PAGO</th>
              <th># TRANSACCION</th>
              <th>TIPO METODO PAGO</th>
              <th>ESTADO TRANSACCION</th>
              <th>FECHA ENVIO</th>
              <th>TRANSPORTADORA</th>
              <th># GUIA</th>
              <th>ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>${order.totalPrice.toFixed(2)}</td>
                <td>{order.paymentMethod}</td>
                
                <td>{order.isPaid ? order.paidAt : 'No registra fecha pago'}</td>
                <td>{order?.paymentResult?.transaction?.id}</td>
                <td>{order?.paymentResult?.transaction?.payment_method_type}</td>
                <td>{order?.paymentResult?.transaction?.status}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Pendiente por despacho'}
                </td>
                <td>{order.delivery?.transport ? order.delivery?.transport : "No registra despacho" }</td>
                <td>{order.delivery?.numberGuide ? order.delivery?.numberGuide: "No registra despacho" }</td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => handleClick(order.id)}
                  >
                   <MdInfo /> Detalles
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
