import { useDispatch, useSelector } from 'react-redux';
import { cleanUsersOrders, getOrdersUsers } from '../../Redux/Actions/actions';
import { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa'; // Icono para el spinner

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
    <div className="container mx-auto p-4">
      {isLoading ? (
        <div className="flex items-center mb-12">
          <FaSpinner className="animate-spin text-gray-500 h-12 w-12" />
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-100 border border-gray-200 rounded-md">
            <thead className="bg-botonVerde text-white">
              <tr>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">ID PEDIDO</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">FECHA DESPACHO</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300"># GUIA</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">TRANSPORTADORA</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">DIRECCION ENVIO</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">TELEFONO CLIENTE</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">NOMBRE CLIENTE</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">DESTINO MUNICIPIO</th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">DESTINO DEPARTAMENTO</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{order.id}</td>
                  <td className="px-4 py-2 border-b">{order.delivery?.date.substring(0, 10)}</td>
                  <td className="px-4 py-2 border-b">{order.delivery?.numberGuide}</td>
                  <td className="px-4 py-2 border-b">{order.delivery?.transport}</td>
                  <td className="px-4 py-2 border-b">{order.delivery?.shippingAddress.address}</td>
                  <td className="px-4 py-2 border-b">{order.shippingAddress?.phone}</td>
                  <td className="px-4 py-2 border-b">{order.shippingAddress?.first_name + " " + order.shippingAddress?.last_name}</td> 
                  <td className="px-4 py-2 border-b">{order.delivery?.shippingAddressCity}</td>
                  <td className="px-4 py-2 border-b">{order.delivery?.shippingAddressCountry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default TableDeliverys;

