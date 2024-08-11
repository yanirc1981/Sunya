import { useDispatch, useSelector } from 'react-redux';
import { cleanUsersOrders, getOrdersUsers } from '../../Redux/Actions/actions';
import { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { FaFilter, FaTimes } from 'react-icons/fa'; 
import { FaSpinner } from 'react-icons/fa'; // Icono para el spinner
import 'react-datepicker/dist/react-datepicker.css';

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
    <div className="p-4 ml- bg-white shadow-md rounded-md">
      <div className="mb-4">
        <div className="flex gap-4 mb-4">
          <div className="flex-1  ml-64">
            <label className="block text-xl mt-12 font-bold text-gray-700">Desde</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
              dateFormat="yyyy-MM-dd"
              isClearable
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xl mt-12 font-bold text-gray-700">Hasta</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
              dateFormat="yyyy-MM-dd"
              isClearable
              className="mt-1 block w-full border border-gray-300 rounded-md p-2"
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Método de Pago</label>
          <select
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          >
            <option value="">TODOS</option>
            <option value="WompyBancolombia">WOMPYBANCOLOMBIA</option>
            <option value="Efectivo">EFECTIVO</option>
            <option value="Transferencia Bancaria">TRANSFERENCIA BANCARIA</option>
            <option value="Cheque">CHEQUE</option>
          </select>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleFilter}
            className="px-4 py-2 bg-botonVerde text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <FaFilter className="inline mr-1" /> Filtrar
          </button>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            <FaTimes className="inline mr-1" /> Limpiar Filtros
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64 mt-12">
          <FaSpinner className="animate-spin text-gray-500 h-12 w-12" />
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-gray-100 border border-gray-200 rounded-md">
              <thead className="bg-botonVerde text-white">
                <tr>
                  <th className="px-4 py-2 border-b">ID PEDIDO</th>
                  <th className="px-4 py-2 border-b">FECHA PAGO</th>
                  <th className="px-4 py-2 border-b">METODO DE PAGO</th>
                  <th className="px-4 py-2 border-b">TRANSACCION</th>
                  <th className="px-4 py-2 border-b">CHEQUE</th>
                  <th className="px-4 py-2 border-b">VALOR PAGO</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b">{order.id}</td>
                    <td className="px-4 py-2 border-b">{order.paidAt.substring(0, 10)}</td>
                    <td className="px-4 py-2 border-b">{order.paymentMethod}</td>
                    <td className="px-4 py-2 border-b">
                      {order.paymentResult?.transactionNumber || order.paymentResult?.transaction?.id || 'N/A'}
                    </td>
                    <td className="px-4 py-2 border-b">{order.paymentResult?.checkNumber ?? 'N/A'}</td>
                    <td className="px-4 py-2 border-b">
                      $ {parseFloat(order.totalPrice).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4">
            <h5 className="text-lg font-semibold">Total Ingreso: $ {parseFloat(totalAmount).toLocaleString('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h5>
          </div>
        </>
      )}
    </div>
  );
};

export default TablePays;

