import { useEffect, useMemo, useState } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { BsCart3 } from "react-icons/bs";
//import { FaShoppingCart } from 'react-icons/fa';
import {
  cleanCartItems,
  cleanProduct,
  getCartItems,
  getProductById,
  postAddToCart,
} from "../../Redux/Actions/actions";
import LoadingBox from "../LoadingBox";
import MessageBox from "../MessageBox";
import "./product.css";

export default function ProductScreen() {
  const params = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const { id_product } = params;
  const userInfo = useSelector((state) => state.userInfo);

  const cartItems = useSelector((state) => state.cartItems);

  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);
  const product = useSelector((state) => state.product);
  const [loading, setLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);

    if (userInfo.token) {
      dispatch(getCartItems({ headers, id }))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }

    dispatch(getProductById(id_product))
      .then(() => setLoading(false))
      .catch(() => setLoading(false));

    return () => {
      dispatch(cleanProduct());
      dispatch(cleanCartItems());
    };
  }, [dispatch, id_product, id, headers, userInfo.token]);

  const addToCartHandler = async (productId) => {
    const existingItem = cartItems.find(
      (item) => item.id_product === productId
    );

    try {
      if (existingItem) {
        const quantity = existingItem.quantity + 1;
        const productCart = existingItem.Product;
        if (productCart.countInStock < quantity) {
          alert("¡Producto sin stock!");
          return;
        }
        const response = await dispatch(
          postAddToCart({ headers, id, quantity, productId })
        );
        if (response.success) {
          history.push("/cart");
        }
      } else {
        const quantity = 1;
        if (product.countInStock < quantity) {
          alert("¡Producto sin stock!");
          return;
        }
        const response = await dispatch(
          postAddToCart({ headers, id, quantity, productId })
        );
        if (response.success) {
          history.push("/cart");
        }
      }
    } catch (error) {
      console.error("Hubo un error al agregar el producto al carrito:", error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container mx-auto px-4 py-8 mb-36 mt-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex justify-center">
          <img
            className="rounded-lg shadow-md w-full max-w-xs"
            src={
              product.images && product.images[0]
                ? product.images[0]
                : "default-image-url"
            }
            alt={product.name}
          />
        </div>
        <div className="flex flex-col justify-between">
          <div className="mb-4">
            <h3 className="text-2xl font-semibold text-gray-800">
              {product.name}
            </h3>
            <p className="text-lg font-bold text-green-600 mt-2">
              {formatPrice(product.price)}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Marca:</strong> {product.brand}
            </p>
            <p className="text-sm text-gray-600 mt-2">
              <strong>Presentación:</strong> {product.slug}
            </p>
            <p className="text-sm text-gray-600 mt-4">
              <strong>Descripción:</strong> {product.description}
            </p>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Precio:</span>
                <span className="text-lg font-bold text-gray-800">
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Estado:</span>
                <span>
                  {product.countInStock > 0 ? (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      En Stock
                    </span>
                  ) : (
                    <span className="inline-block px-2 py-1 text-xs font-semibold text-red-800 bg-red-200 rounded-full">
                      Agotado
                    </span>
                  )}
                </span>
              </div>
            </div>
            {product.countInStock > 0 && (
              <button
                className="w-full flex items-center justify-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-200"
                onClick={
                  userInfo.token ? () => addToCartHandler(product.id) : null
                }
              >
                {userInfo.token ? (
                  <>
                    <BsCart3 size={22} className="mr-2" /> Agregar
                  </>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center w-full"
                  >
                    <BsCart3 size={22} className="mr-2" /> Agregar
                  </Link>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
