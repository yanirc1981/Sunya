import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link, useHistory } from 'react-router-dom';
import { BsCart3 } from "react-icons/bs";
import './product.css';
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
    <Card className="product-card border-0">
      <Link to={`/product/${product.id}`}>
        <div className="card-img-container">
          <Card.Img
            variant="top"
            src={product.image}
            className="product-image"
          />
        </div>
      </Link>
      <Card.Body className="text-center">
        <Card.Title>
          {' '}
          <strong>{product.name}</strong>
        </Card.Title>
        <Card.Text>{product.slug}</Card.Text>
        <Card.Text
          style={{
            color: 'orangered',
          }}
        >
         <strong>$  {formatPrice(product.price)}</strong> 
        </Card.Text>
        {product.countInStock === 0 ? (
          <Button varient="light" disabled>
            Agotado
          </Button>
        ) : (
          <button
            className="button_card"
            onClick={userInfo.token ? () => addToCartHandler(product.id) : null}
          >
            {userInfo.token ? (
              <div className='link_products'>
                <BsCart3  size={18} /> 
              </div>
            ) : (
              <Link to="/login" className="link_products">
                <BsCart3  size={18} /> 
              </Link>
            )}
          </button>
        )}
      </Card.Body>
    </Card>
  );
}

export default Product;
