// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { cleanUsersAdmin, getUsersAdmin } from '../../Redux/Actions/actions';
import { FaEdit, FaSearch, FaRedoAlt } from 'react-icons/fa';
import EditProfile from '../EditProfile/EditProfile';

const Users = () => {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const users = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };

    setIsLoading(true);

    dispatch(getUsersAdmin({ headers }))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanUsersAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filtered = users.filter(
      (user) => user.email.includes(term) || user.n_document.includes(term)
    );
    setFilteredUsers(filtered);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex items-center mb-4">
        <FaSearch className="text-gray-500 mr-2" />
        <input
          type="text"
          placeholder="Buscar por documento ó email"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 border border-gray-300 rounded w-full"
        />
        <FaRedoAlt
          onClick={() => setSearchTerm('')}
          className="text-gray-500 ml-2 cursor-pointer"
        />
      </div>
      {isLoading ? (
        <div className="flex justify-center items-center">
          <svg className="animate-spin h-5 w-5 text-gray-500" viewBox="0 0 24 24">
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
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-botonVerde text-white">
                <th className="py-2 px-4 border-b">ID documento</th>
                <th className="py-2 px-4 border-b">Tipo persona</th>
                <th className="py-2 px-4 border-b">Nombres</th>
                <th className="py-2 px-4 border-b">Apellidos</th>
                <th className="py-2 px-4 border-b">Razon social</th>
                <th className="py-2 px-4 border-b">Correo electronico</th>
                <th className="py-2 px-4 border-b">Telefono</th>
                <th className="py-2 px-4 border-b">Estado</th>
                <th className="py-2 px-4 border-b">Rol</th>
                <th className="py-2 px-4 border-b">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {searchTerm === ''
                ? users.map((user, index) => {
                    const userStatus = user.active ? 'activo' : 'inactivo';
                    const personType = user.person_type === "Person" ? "Persona" : "Compañia";
                    let userRol;

                    switch (user.id_role) {
                      case 1:
                        userRol = 'Usuario';
                        break;
                      case 2:
                        userRol = 'Cajero';
                        break;
                      case 3:
                        userRol = 'Admin';
                        break;
                      case 4:
                        userRol = 'SuperAdmin';
                        break;
                      default:
                        userRol = 'Desconocido';
                    }

                    return (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{user.n_document}</td>
                        <td className="py-2 px-4 border-b">{personType}</td>
                        <td className="py-2 px-4 border-b">{user.first_name}</td>
                        <td className="py-2 px-4 border-b">{user.last_name}</td>
                        <td className="py-2 px-4 border-b">{user.nameCompany}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.phone}</td>
                        <td className="py-2 px-4 border-b">{userStatus}</td>
                        <td className="py-2 px-4 border-b">{userRol}</td>
                        <td className="py-2 px-4 border-b">
                          <FaEdit
                            onClick={() => handleEdit(user)}
                            className="text-botonVerde cursor-pointer"
                            title="Modificar info"
                          />
                        </td>
                      </tr>
                    );
                  })
                : filteredUsers.map((user, index) => {
                    const userStatus = user.active ? 'activo' : 'inactivo';
                    const personType = user.person_type === "Person" ? "Persona" : "Compañia";
                    let userRol;

                    switch (user.id_role) {
                      case 1:
                        userRol = 'Usuario';
                        break;
                      case 2:
                        userRol = 'Cajero';
                        break;
                      case 3:
                        userRol = 'Admin';
                        break;
                      case 4:
                        userRol = 'SuperAdmin';
                        break;
                      default:
                        userRol = 'Desconocido';
                    }

                    return (
                      <tr key={index}>
                        <td className="py-2 px-4 border-b">{user.n_document}</td>
                        <td className="py-2 px-4 border-b">{personType}</td>
                        <td className="py-2 px-4 border-b">{user.first_name}</td>
                        <td className="py-2 px-4 border-b">{user.last_name}</td>
                        <td className="py-2 px-4 border-b">{user.nameCompany}</td>
                        <td className="py-2 px-4 border-b">{user.email}</td>
                        <td className="py-2 px-4 border-b">{user.phone}</td>
                        <td className="py-2 px-4 border-b">{userStatus}</td>
                        <td className="py-2 px-4 border-b">{userRol}</td>
                        <td className="py-2 px-4 border-b">
                          <FaEdit
                            onClick={() => handleEdit(user)}
                            className="text-botonVerde cursor-pointer"
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
      {selectedUser && (
        <div
          className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-50`}
          onClick={handleCloseModal}
        >
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl mb-4">
              Editar información del usuario con ID: {selectedUser.n_document}
            </h2>
            <EditProfile user={selectedUser} setShowModal={setShowModal} />
            <button
              onClick={handleCloseModal}
              className="mt-4 p-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;

