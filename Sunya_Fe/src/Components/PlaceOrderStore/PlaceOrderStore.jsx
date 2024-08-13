import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import LoadingBox from '../LoadingBox';
import {
  cleanCartItems,
  cleanPaymentMethod,
  cleanShippingAddress,
  deleteCartUser,
  getCartItems,
  postOrder,
} from '../../Redux/Actions/actions';
import './placeorderstore.css';
import { cleanPaymentsTypeSiigo, getPaymentsTypeSiigo } from '../../Redux/ActionsSiigo/actionsSiigo';

export default function PlaceOrderStore() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const userInfo = useSelector((state) => state.userInfo);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const paymentsType = useSelector((state) => state.paymentsType);
  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.2345 => 123.23
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.Product.price, 0)
  );
  const taxPrice = round2(0.19 * itemsPrice);
  const totalPrice = itemsPrice + taxPrice;

  const findPaymentId = () => {
    const selectedPayment = paymentsType.find(payment => payment.name === paymentMethod)
    const paymentId = selectedPayment ? selectedPayment.id : null;
    return paymentId;
  };

  const placeOrderHandler = async () => {
    try {
      const paymentId = findPaymentId();
      const info = {
        orderItems: cartItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        paymentId: paymentId,
        itemsPrice: itemsPrice,
        taxPrice: taxPrice,
        totalPrice: totalPrice,
      };
      
      const response = await dispatch(postOrder({ headers, info }));

      if (response.success) {
        dispatch(deleteCartUser({ headers }));
        dispatch(cleanCartItems());
        dispatch(cleanPaymentMethod());
        dispatch(cleanShippingAddress());
        history.push(`/orderstore/${response.orderId}`);
      }
    } catch (error) {
      console.error('Hubo un error al crear la orden:', error);
    }
  };

  useEffect(() => {
    if (!paymentMethod) {
      history.push('/payment');
    }
    dispatch(getCartItems({ headers, id }));
    dispatch(getPaymentsTypeSiigo({ headers }))

    return () => {
      dispatch(cleanPaymentsTypeSiigo());
    };
  }, [history, paymentMethod, dispatch, headers, id]);

  return (
    <div className="container mx-auto p-4">
      <CheckoutSteps step1 step2 step3 step4 />

      <h1 className="my-3 text-xl font-bold">Vista Previa del Pedido</h1>
      <div className="md:flex">
        <div className="md:w-2/3 md:mr-4">
          <div className="mb-3 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Datos cliente</h2>
            <p><strong>Nombres:</strong> {shippingAddress?.first_name}</p>
            <p><strong>Apellidos:</strong> {shippingAddress?.last_name}</p>
            <p><strong>Dirección:</strong> {shippingAddress?.address}</p>
            <p><strong>Teléfono:</strong> {shippingAddress?.phone}</p>
            <Link to="/shipping2" className="text-blue-500 hover:underline">Editar</Link>
          </div>

          <div className="mb-3 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Pago</h2>
            <p><strong>Medio:</strong> {paymentMethod}</p>
            <Link to="/payment" className="text-blue-500 hover:underline">Editar</Link>
          </div>

          <div className="mb-3 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Items</h2>
            <ul className="list-none p-0">
              {cartItems.map((item) => (
                <li key={item.id} className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <img
                      src={item.Product.image}
                      alt={item.Product.name}
                      className="w-12 h-12 object-cover rounded mr-2"
                    />
                    <Link to={`/product/${item.id_product}`} className="text-blue-500 hover:underline">
                      {item.Product.name}
                    </Link>
                  </div>
                  <div className="flex space-x-2">
                    <span>{item.quantity}</span>
                    <span>${item.Product.price}</span>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/cart" className="text-blue-500 hover:underline">Editar</Link>
          </div>
        </div>

        <div className="md:w-1/3">
          <div className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Resumen del Pedido</h2>
            <ul className="list-none p-0">
              <li className="flex justify-between mb-2">
                <span>Items</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between mb-2">
                <span>Impuesto iva 19%</span>
                <span>${taxPrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between font-bold mb-4">
                <span>Total pedido</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>
            </ul>
            <button
              type="button"
              onClick={placeOrderHandler}
              disabled={cartItems.length === 0}
              className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
            >
              Generar pedido
            </button>
            {loading && <LoadingBox />}
          </div>
        </div>
      </div>
    </div>
  );
}

