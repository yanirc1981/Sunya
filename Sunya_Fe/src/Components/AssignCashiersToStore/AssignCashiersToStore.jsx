import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { useHistory } from 'react-router-dom';
import {
  cleanInfoStores,
  cleanUsersAdmin,
  getStores,
  getUsersAdmin,
  postAssignCasherStore,
} from '../../Redux/Actions/actions';

const AssignCashiersToStore = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const token = userInfo.token;
  const headers = { Authorization: `Bearer ${token}` };
  const stores = useSelector((state) => state.stores);
  const users = useSelector((state) => state.users);
  const [selectedStore, setSelectedStore] = useState('');
  const [selectedCashiers, setSelectedCashiers] = useState([]);

  useEffect(() => {
    const fetchStoresAndCashiers = async () => {
      await dispatch(getStores());
      await dispatch(getUsersAdmin({ headers }));
    };

    fetchStoresAndCashiers();
    return () => {
      dispatch(cleanUsersAdmin());
      dispatch(cleanInfoStores());
    };
  }, [dispatch, userInfo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      storeId: selectedStore,
      userIds: selectedCashiers,
    };

    try {
      const response = await dispatch(postAssignCasherStore({ headers, data }));
      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El cajero fue asignado correctamente.',
        });
        setSelectedStore('');
        setSelectedCashiers([]);
        history.push("/admin/dashboard");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud. Cajero ya está asignado a esa tienda.',
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

  const handleCashierChange = (e) => {
    const cashierId = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCashiers((prevSelectedCashiers) => {
      if (isChecked) {
        return [...prevSelectedCashiers, cashierId];
      } else {
        return prevSelectedCashiers.filter((id) => id !== cashierId);
      }
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Asignar Cajeros a Tienda</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">Tienda</label>
            <select
              id="store"
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
              required
              className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Seleccionar Tienda</option>
              {stores.map((store) => (
                <option key={store.id} value={store.id}>
                  {store.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Cajeros</label>
            <div className="space-y-2">
              {users
                .filter((user) => user.id_role === 2 && user.active)
                .map((user) => (
                  <div key={user.id} className="flex items-center">
                    <input
                      id={`cashier-${user.id}`}
                      type="checkbox"
                      value={user.id}
                      onChange={handleCashierChange}
                      checked={selectedCashiers.includes(user.id)}
                      className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                    />
                    <label htmlFor={`cashier-${user.id}`} className="ml-2 text-sm font-medium text-gray-700">
                      {`${user.first_name} ${user.last_name}`}
                    </label>
                  </div>
                ))}
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Asignar Cajeros
          </button>
        </form>
      </div>
    </div>
  );
};

export default AssignCashiersToStore;

