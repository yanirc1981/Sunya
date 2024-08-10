import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleanCustomersAdmin,
  getCustomersAdmin,
} from "../../Redux/Actions/actions";
import { FaEdit, FaSearch, FaRedoAlt } from "react-icons/fa";

const Customers = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const customers = useSelector((state) => state.customersDataBase);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [, setFilteredCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };

    setIsLoading(true);

    dispatch(getCustomersAdmin({ headers }))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanCustomersAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (customer) => {
    setSelectedCustomer(customer);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCustomer(null);
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = customers.filter((customer) =>
      customer.identification.includes(term)
    );
    setFilteredCustomers(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Identificación cliente"
          value={searchTerm}
          onChange={handleSearchChange}
          className="border rounded px-2 py-1"
        />
        <FaRedoAlt
          onClick={() => setSearchTerm("")}
          className="text-gray-500 ml-2 cursor-pointer"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg
            className="animate-spin h-5 w-5 text-gray-500"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8z"
            ></path>
          </svg>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-full bg-botonVerde border border-gray-300 text-sm">
            <thead>
              <thead>
                <tr className="bg-botonVerde">
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    IDENTIFICACION
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    STATUS CLIENTE
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    NOMBRES
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    APELLIDOS
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    RAZON SOCIAL
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    TIPO DE PERSONA
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    DIRECCION
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    CODIGO CIUDAD
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    CODIGO DEPARTAMENTO
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    TELEFONO
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    ID VENDEDOR ASIGNADO
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    ID COBRADOR ASIGNADO
                  </th>
                  <th className="py-1 px-2 text-white border-b border-l border-gray-300">
                    ACCIONES
                  </th>
                </tr>
              </thead>
            </thead>
            <tbody>
              {customers.map((customer, index) => {
                const customerStatus = customer.active ? "activo" : "inactivo";
                const personType =
                  customer.person_type === "Person" ? "Persona" : "Compañia";

                return (
                  <tr key={index}>
                    <td className="py-1 px-2 ">{customer.identification}</td>
                    <td className="py-1 px-2">{customerStatus}</td>
                    <td className="py-1 px-2">{customer.first_name}</td>
                    <td className="py-1 px-2">{customer.last_name}</td>
                    <td className="py-1 px-2">{customer.nameCompany}</td>
                    <td className="py-1 px-2">{personType}</td>
                    <td className="py-1 px-2">{customer.address}</td>
                    <td className="py-1 px-2">{customer.city_code}</td>
                    <td className="py-1 px-2">{customer.state_code}</td>
                    <td className="py-1 px-2">{customer.number}</td>
                    <td className="py-1 px-2">{customer.seller_id}</td>
                    <td className="py-1 px-2">{customer.collector_id}</td>
                    <td className="py-1 px-2">
                      <FaEdit
                        onClick={() => handleEdit(customer)}
                        className="icon_edit"
                        title="Modificar info"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {selectedCustomer && showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl mb-4">
              Editar información del usuario con ID:{" "}
              {selectedCustomer.identification}
            </h2>
            <p>Hola, estoy en construcción</p>
            <button
              className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Customers;
