import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { cleanOrdersUser, getOrderById, getOrdersUser } from '../../Redux/Actions/actions';
import { MdInfo } from 'react-icons/md';

export default function OrderHistoryUser() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  // eslint-disable-next-line no-unused-vars
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
      dispatch(cleanOrdersUser());
    };
  }, [dispatch, headers]);

  const handleClick = async (orderId) => {
    try {
      const response = await dispatch(getOrderById({ orderId, headers }));

      if (response.success) {
        if (isAdmin || isCashier) {
          history.push(`/orderStore/${orderId}`);
        } else {
          history.push(`/order/${orderId}`);
        }
      } else {
        setError('Failed to fetch order details');
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Historial de pedidos</h1>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <table className="w-full min-w-full border text-gray-600 border-gray-300 text-sm">
          <thead>
            <tr className=" bg-botonVerde  text-white">
              <th className="py-2 px-4 border-b">ID PEDIDO</th>
              <th className="py-2 px-4 border-b">FECHA PEDIDO</th>
              <th className="py-2 px-4 border-b">TOTAL PEDIDO</th>
              <th className="py-2 px-4 border-b">METODO PAGO</th>
              <th className="py-2 px-4 border-b">FECHA PAGO</th>
              <th className="py-2 px-4 border-b"># TRANSACCION</th>
              <th className="py-2 px-4 border-b">TIPO METODO PAGO</th>
              <th className="py-2 px-4 border-b">ESTADO TRANSACCION</th>
              <th className="py-2 px-4 border-b">FECHA ENVIO</th>
              <th className="py-2 px-4 border-b">TRANSPORTADORA</th>
              <th className="py-2 px-4 border-b"># GUIA</th>
              <th className="py-2 px-4 border-b">ACCIONES</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b text-center">{order.id}</td>
                <td className="py-2 px-4 border-b text-center">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2 px-4 border-b text-center">${order.totalPrice.toFixed(2)}</td>
                <td className="py-2 px-4 border-b text-center">{order.paymentMethod}</td>
                <td className="py-2 px-4 border-b text-center">
                  {order.isPaid ? order.paidAt : 'No registra fecha pago'}
                </td>
                <td className="py-2 px-4 border-b text-center">{order?.paymentResult?.transaction?.id}</td>
                <td className="py-2 px-4 border-b text-center">{order?.paymentResult?.transaction?.payment_method_type}</td>
                <td className="py-2 px-4 border-b text-center">{order?.paymentResult?.transaction?.status}</td>
                <td className="py-2 px-4 border-b text-center">
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'Pendiente por despacho'}
                </td>
                <td className="py-2 px-4 border-b text-center">{order.delivery?.transport || 'No registra despacho'}</td>
                <td className="py-2 px-4 border-b text-center">{order.delivery?.numberGuide || 'No registra despacho'}</td>
                <td className="py-2 px-4 border-b text-center">
                  <button
                    type="button"
                    className="inline-flex items-center px-3 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium rounded"
                    onClick={() => handleClick(order.id)}
                  >
                    <MdInfo className="mr-1" /> Detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

