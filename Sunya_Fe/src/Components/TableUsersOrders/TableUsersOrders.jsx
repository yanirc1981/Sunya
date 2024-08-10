import { useDispatch, useSelector } from "react-redux";
import {
  cleanUsersOrders,
  getOrderById,
  getOrdersUsers,
} from "../../Redux/Actions/actions";
import { useEffect, useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import { FaSearch, FaRedoAlt } from "react-icons/fa";
import { MdInfo, MdSend } from "react-icons/md";
import "./tableusersbookings.css";
import {
  cleanCostCenters,
  cleanTypeInvoiceSiigo,
  cleanUsers,
  getCostCenters,
  getTypeInvoiceSiigo,
  getUsersSiigo,
  postGenerateInvoice,
} from "../../Redux/ActionsSiigo/actionsSiigo";
import Swal from "sweetalert2";

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
  const [, setError] = useState(false);
  const [, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState(null);
  const [invoiceType, setInvoiceType] = useState("");
  const [sendToDian, setSendToDian] = useState(false);
  const [sendToEmail, setSendToEmail] = useState(false);
  const [sendToCostCenters, setSendToCostCenters] = useState(0);
  const [sendToCommentsInvoice, setSendToCommentsInvoice] = useState("");
  const [sendToUser, setSendToUser] = useState("");
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

    const filtered = orders.filter((order) => {
      const ordersStatus = order.active ? "pedido activo" : "pedido cancelado";
      const statusPay = order.isPaid ? "Pagado" : "No registra pago";
      const statusDelivered = order.isDelivered
        ? "Despachado"
        : "No registra envio";
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
        setError("Failed to fetch order details");
      }
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleShowModal = (orderId) => {
    dispatch(getTypeInvoiceSiigo());
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
    setInvoiceType("");
    setSendToDian(false);
    setSendToEmail(false);
    setSendToCostCenters(0);
    setSendToCommentsInvoice("");
    setSendToUser("");
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
          icon: "success",
          title: "¡Éxito!",
          text: "¡Factura generada!.",
        });
        handleCloseModal();
        history.push("/admin/invoices_list");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "No se pudo generar la factura. Intentelo nuevamente",
        });
      }
    } catch (error) {
      console.error("Hubo un error al enviar el formulario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El inicio de sesión NO fue exitoso. Verifique email y password.",
      });
    }
  };

  //eslint-disable-next-line no-unused-vars
  const isCostCenterFieldVisible = () => {
    const selectedType = typeInvoices.find((type) => type.id === invoiceType);
    return selectedType ? selectedType.cost_center : false;
  };

  // eslint-disable-next-line no-unused-vars
  const isSendStampFieldVisible = () => {
    const selectedType = typeInvoices.find((type) => type.id === invoiceType);

    return selectedType?.electronic_type === "NoElectronic" ? true : false;
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-12">
        <div className="relative flex-grow">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            className="pl-10 pr-4 py-2 border rounded-md w-full"
            placeholder="Buscar..."
          />
        </div>
        <FaRedoAlt
          className="ml-4 cursor-pointer text-gray-500"
          onClick={() => setSearchTerm("")}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table-auto w-full text-left border-collapse">
            <thead className="bg-botonVerde text-white">
              <tr>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  ID
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  FECHA PEDIDO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  ID VENDEDOR
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  NOMBRE CLIENTE
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  APELLIDO CLIENTE
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  TOTAL
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  METODO DE PAGO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  ESTADO PAGO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  FECHA PAGO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  DESPACHO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  ESTADO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  ID FACTURA SIIGO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  ACCIONES
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  GENERAR DESPACHO
                </th>
                <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                  FACTURA
                </th>
              </tr>
            </thead>
            <tbody>
              {searchTerm === ""
                ? orders.map((order, index) => {
                    const ordersStatus = order.active
                      ? "pedido activo"
                      : "pedido cancelado";
                    const statusPay = order.isPaid
                      ? "Aprovado"
                      : "No registra pago";
                    const statusDelivered = order.isDelivered
                      ? "Despachado"
                      : "No registra envio";
                    return (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">
                          {order.shippingAddress.first_name}
                        </td>
                        <td className="px-4 py-2">
                          {order.shippingAddress.last_name}
                        </td>
                        <td className="px-4 py-2">{order.totalPrice}</td>
                        <td className="px-4 py-2">{order.paymentMethod}</td>
                        <td className="px-4 py-2">{statusPay}</td>
                        <td className="px-4 py-2">
                          {order.paidAt ? order.paidAt.substring(0, 10) : "-"}
                        </td>
                        <td className="px-4 py-2">{statusDelivered}</td>
                        <td className="px-4 py-2">{ordersStatus}</td>
                        <td className="px-4 py-2">
                          {order.siigo_invoice_id ? order.siigo_invoice_id : ""}
                        </td>
                        <td className="px-4 py-2">
                          <MdInfo
                            className="cursor-pointer text-blue-500 hover:text-blue-600 transition duration-300"
                            onClick={() => handleClick(order.id)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <MdSend
                            className="cursor-pointer text-green-500 hover:text-green-600 transition duration-300"
                            onClick={() => handleClick(order.id)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleShowModal(order.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Generar
                          </button>
                        </td>
                      </tr>
                    );
                  })
                : filteredOrders.map((order, index) => {
                    const ordersStatus = order.active
                      ? "pedido activo"
                      : "pedido cancelado";
                    const statusPay = order.isPaid
                      ? "Aprovado"
                      : "No registra pago";
                    const statusDelivered = order.isDelivered
                      ? "Despachado"
                      : "No registra envio";
                    return (
                      <tr key={index} className="border-b">
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">
                          {order.createdAt.substring(0, 10)}
                        </td>
                        <td className="px-4 py-2">{order.id}</td>
                        <td className="px-4 py-2">
                          {order.shippingAddress.first_name}
                        </td>
                        <td className="px-4 py-2">
                          {order.shippingAddress.last_name}
                        </td>
                        <td className="px-4 py-2">{order.totalPrice}</td>
                        <td className="px-4 py-2">{order.paymentMethod}</td>
                        <td className="px-4 py-2">{statusPay}</td>
                        <td className="px-4 py-2">
                          {order.paidAt ? order.paidAt.substring(0, 10) : "-"}
                        </td>
                        <td className="px-4 py-2">{statusDelivered}</td>
                        <td className="px-4 py-2">{ordersStatus}</td>
                        <td className="px-4 py-2">
                          {order.siigo_invoice_id ? order.siigo_invoice_id : ""}
                        </td>
                        <td className="px-4 py-2">
                          <MdInfo
                            className="cursor-pointer text-blue-500 hover:text-blue-600 transition duration-300"
                            onClick={() => handleClick(order.id)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <MdSend
                            className="cursor-pointer text-green-500 hover:text-green-600 transition duration-300"
                            onClick={() => handleClick(order.id)}
                          />
                        </td>
                        <td className="px-4 py-2">
                          <button
                            onClick={() => handleShowModal(order.id)}
                            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full"
                          >
                            Generar
                          </button>
                        </td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Generar Factura</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Tipo de Factura:
              </label>
              <select
                value={invoiceType}
                onChange={(e) => setInvoiceType(e.target.value)}
                className="block w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar...</option>
                {typeInvoices.map((typeInvoice) => (
                  <option key={typeInvoice.id} value={typeInvoice.id}>
                    {typeInvoice.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Enviar a DIAN:
              </label>
              <input
                type="checkbox"
                checked={sendToDian}
                onChange={(e) => setSendToDian(e.target.checked)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Enviar a Email:
              </label>
              <input
                type="checkbox"
                checked={sendToEmail}
                onChange={(e) => setSendToEmail(e.target.checked)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Centro de Costos:
              </label>
              <select
                value={sendToCostCenters}
                onChange={(e) => setSendToCostCenters(e.target.value)}
                className="block w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar...</option>
                {costCenters.map((costCenter) => (
                  <option key={costCenter.id} value={costCenter.id}>
                    {costCenter.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Comentarios:
              </label>
              <textarea
                value={sendToCommentsInvoice}
                onChange={(e) => setSendToCommentsInvoice(e.target.value)}
                maxLength={maxLength}
                className="block w-full p-2 border rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Cliente:</label>
              <select
                value={sendToUser}
                onChange={(e) => setSendToUser(e.target.value)}
                className="block w-full p-2 border rounded-md"
              >
                <option value="">Seleccionar...</option>
                {usersSiigo.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleGenerateInvoice}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full mr-2"
              >
                Generar
              </button>
              <button
                onClick={handleCloseModal}
                className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableUsersOrders;
