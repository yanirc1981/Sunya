import { Link, useHistory } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanCartItems,
  getCartItems,
  postAddToCart,
} from '../../Redux/Actions/actions';
import { useEffect, useMemo } from 'react';

function Product(props) {
  const { product } = props;
  const dispatch = useDispatch();
  const history = useHistory();
  const userInfo = useSelector((state) => state.userInfo);
  const cartItems = useSelector((state) => state.cartItems);
  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);

  useEffect(() => {
    if (userInfo.token) {
      dispatch(getCartItems({ headers, id }));
    }

    return () => {
      dispatch(cleanCartItems());
    };
  }, [dispatch, id, headers, userInfo]);

  const addToCartHandler = async (productId) => {
    const existingItem = cartItems.find(
      (item) => item.id_product === productId
    );

    try {
      if (existingItem) {
        const quantity = existingItem.quantity + 1;
        const productCart = existingItem.Product;
        if (productCart.countInStock < quantity) {
          alert('¡Producto sin stock!');
          return;
        }
        const response = await dispatch(
          postAddToCart({ headers, id, quantity, productId })
        );
        if (response.success) {
          dispatch(cleanCartItems());
          dispatch(getCartItems({ headers, id }));
        }
      } else {
        const quantity = 1;
        if (product.countInStock < quantity) {
          alert('¡Producto sin stock!');
          return;
        }
        const response = await dispatch(
          postAddToCart({ headers, id, quantity, productId })
        );
        if (response.success) {
          dispatch(cleanCartItems());
          dispatch(getCartItems({ headers, id }));
        }
      }
    } catch (error) {
      console.error('Hubo un error al agregar el producto al carrito:', error);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="border-0 shadow-lg rounded-md overflow-hidden bg-white">
      <Link to={`/product/${product.id}`}>
        <div className="w-full h-64 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>
      <div className="p-4 text-center">
        <h2 className="text-lg font-bold mb-2">{product.name}</h2>
        <p className="text-sm text-gray-500">{product.slug}</p>
        <p className="text-xl text-orangered font-semibold mb-2">
          {formatPrice(product.price)}
        </p>
        {product.countInStock === 0 ? (
          <button
            className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md cursor-not-allowed"
            disabled
          >
            Agotado
          </button>
        ) : (
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition duration-300"
            onClick={userInfo.token ? () => addToCartHandler(product.id) : null}
          >
            {userInfo.token ? (
              <div className="flex items-center justify-center">
                <BsCart3 size={18} />
              </div>
            ) : (
              <Link to="/login" className="flex items-center justify-center">
                <BsCart3 size={18} />
              </Link>
            )}
          </button>
        )}
      </div>
    </div>
  );
}

export default Product;

