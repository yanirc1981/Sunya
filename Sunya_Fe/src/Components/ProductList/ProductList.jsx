/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { cleanProductsAdmin, getProductsAdmin, updateProductStatus } from '../../Redux/Actions/actions';
import { FaEdit } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
import ToggleButton from '../ToggleButton';
import EditProduct from '../EditProduct/EditProduct';
import NewProduct from '../NewProduct/NewProduct';
import './productlist.css';

export default function ProductList() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [loadingCreate, setLoadingCreate] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [createdProduct, setCreatedProduct] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [error, setError] = useState(false);
  const userInfo = useSelector((state) => state.userInfo);
  const products = useSelector((state) => state.productsAdmin);

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    setLoading(true);
    dispatch(getProductsAdmin({headers}))
      .then(() => setLoading(false))
      .catch(() => {
        setLoading(false);
        setError('Error al cargar los productos.');
      });

    return () => {
      dispatch(cleanProductsAdmin());
    };
  }, [dispatch, userInfo]);

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    setShowModal(false);
  };

  const createHandler = async () => {
    setCreatedProduct(true);
    setShowModalA(true);
  };

  const handleCloseModalA = () => {
    setCreatedProduct(false);
    setShowModalA(false);
  };

  const upDateHandler = async (product) => {
    const updatedData = {
      active: !product.active,
      id: product.id
    };

    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    const response = await dispatch(updateProductStatus({headers, updatedData}));
    if(response.success){
      await dispatch(cleanProductsAdmin());
      await dispatch(getProductsAdmin({headers}));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Productos Fábrica</h2>
        <div>
          <button
            type="button"
            className="flex items-center text-white bg-botonVerde mr-12 mt-12  font-medium rounded-md px-4 py-2"
            onClick={createHandler}
          >
            <MdAddCircle className="mr-2" /> Crear producto
          </button>
        </div>
      </div>

      {loadingCreate && <LoadingBox />}
      {loadingDelete && <LoadingBox />}

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
          <span className="ml-2">Cargando...</span>
        </div>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-lg">
            <thead className="bg-botonVerde">
              <tr>
                <th className="py-1 px-2">ID</th>
                <th className="py-1 px-2">CODIGO SIIGO</th>
                <th className="py-1 px-2">IMAGEN</th>
                <th className="py-1 px-2">NOMBRE</th>
                <th className="py-1 px-2">PRECIO</th>
                <th className="py-1 px-2">PRESENTACION</th>
                <th className="py-1 px-2">STOCK EN FABRICA</th>
                <th className="py-1 px-2">ACCIONES</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-1 px-2">{product.id}</td>
                  <td className="py-1 px-2">{product.code}</td>
                  <td className="py-1 px-2">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  </td>
                  <td className="py-1 px-2">{product.name}</td>
                  <td className="py-1 px-2">{product.price}</td>
                  <td className="py-1 px-2">{product.slug}</td>
                  <td className="py-1 px-2">{product.countInStock}</td>
                  <td className="py-1 px-2">
                    <span
                      className="text-botonVerde cursor-pointer"
                      onClick={() => handleEdit(product)}
                    >
                      <FaEdit className="inline mr-1" /> Editar
                    </span>
                    <span
                      className="ml-4 text-botonVerde cursor-pointer"
                      onClick={() => upDateHandler(product)}
                    >
                      <ToggleButton status={product.active} />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal for editing product */}
      {selectedProduct && showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">Editar información del producto</h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>
            <div className="mt-4">
              <EditProduct product={selectedProduct} setShowModal={setShowModal} />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModal}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal for creating new product */}
      {showModalA && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <div className="flex justify-between items-center border-b pb-2">
              <h2 className="text-xl font-semibold">Formulario nuevo producto</h2>
              <button
                onClick={handleCloseModalA}
                className="text-gray-500 hover:text-gray-700"
              >
                ✖
              </button>
            </div>
            <div className="mt-4">
              <NewProduct setShowModalA={setShowModalA} />
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={handleCloseModalA}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-md"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

