import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import LoadingBox from '../LoadingBox';
import { municipios, departmentMap } from "../../data";
import {
  cleanCartItems,
  cleanPaymentMethod,
  cleanShippingAddress,
  deleteCartUser,
  getCartItems,
  postOrder,
} from '../../Redux/Actions/actions';
import './placeorder.css';
import { cleanPaymentsTypeSiigo, getPaymentsTypeSiigo } from '../../Redux/ActionsSiigo/actionsSiigo';
import Swal from 'sweetalert2';

export default function PlaceOrder() {
  const history = useHistory();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const cartItems = useSelector((state) => state.cartItems);
  const userInfo = useSelector((state) => state.userInfo);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const paymentsType = useSelector((state) => state.paymentsType);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const id = userInfo?.user?.id;
  const headers = useMemo(() => {
    return { Authorization: `Bearer ${userInfo.token}` };
  }, [userInfo.token]);

  const round2 = (num) => Math.round(num * 100 + Number.EPSILON) / 100;
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.quantity * c.Product.price, 0)
  );
  const taxPrice = round2(0.19 * itemsPrice);
  const totalPrice = itemsPrice + taxPrice;
  const country = departmentMap[shippingAddress?.state_code];
  const city = municipios[shippingAddress?.city_code];

  const findPaymentId = () => {
    const selectedPayment = paymentsType.find(payment => payment.name === paymentMethod);
    const paymentId = selectedPayment ? selectedPayment.id : null;
    return paymentId;
  };

  const placeOrderHandler = async () => {
    try {
      const paymentId = findPaymentId();
      const info = {
        id: id,
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
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Orden creada correctamente!.',
        });
        history.push(`/order/${response.orderId}`);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error al crear la orden',
          text: response.errorMessage || 'Ocurrió un error inesperado.',
        });
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
    dispatch(getPaymentsTypeSiigo({ headers }));

    return () => {
      dispatch(cleanCartItems());
      dispatch(cleanPaymentMethod());
      dispatch(cleanShippingAddress());
      dispatch(cleanPaymentsTypeSiigo());
    };
  }, [history, paymentMethod, dispatch, headers, id]);

  return (
    <div className='container mx-auto px-4'>
      <CheckoutSteps step1 step2 step3 step4 />

      <h1 className="my-3 text-xl font-bold">Vista Previa del Pedido</h1>
      <div className="flex flex-col lg:flex-row lg:space-x-6">
        <div className="lg:w-2/3">
          <div className="mb-3 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold">Datos Envío</h2>
            <p>
              <strong>Nombres:</strong> {shippingAddress?.first_name} <br />
              <strong>Apellidos:</strong> {shippingAddress?.last_name} <br />
              <strong>Nombre Empresa:</strong> {shippingAddress ? shippingAddress?.nameCompany : "N/A"} <br/>
              <strong>Dirección:</strong> {shippingAddress?.address}, {city}, {country} <br />
              <strong>Teléfono:</strong> {shippingAddress?.phone} <br />
            </p>
            <Link to="/shipping" className="text-blue-500">Editar</Link>
          </div>

          <div className="mb-3 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold">Pago</h2>
            <p>
              <strong>Medio:</strong> {paymentMethod}
            </p>
          </div>

          <div className="mb-3 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold">Items</h2>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item, index) => (
                <li key={item.id || index} className="py-4">
                  <div className="flex items-center">
                    <div className="w-2/3 flex items-center space-x-4">
                      <img
                        src={item.Product.image}
                        alt={item.Product.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <Link to={`/product/${item.id_product}`} className="text-blue-500">
                        {item.Product.name}
                      </Link>
                    </div>
                    <div className="w-1/6 text-center">{item.quantity}</div>
                    <div className="w-1/6 text-right">${item.Product.price}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/cart" className="text-blue-500">Editar</Link>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="p-4 border border-gray-300 rounded-lg">
            <h2 className="text-lg font-semibold">Resumen del Pedido</h2>
            <ul className="space-y-2">
              <li className="flex justify-between">
                <span>Items</span>
                <span>${itemsPrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Impuesto IVA 19%</span>
                <span>${taxPrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between font-semibold">
                <span>Total Pedido</span>
                <span>${totalPrice.toFixed(2)}</span>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  disabled={cartItems.length === 0}
                  className="w-full bg-green-500 text-white py-2 rounded-lg disabled:opacity-50"
                >
                  Generar pedido
                </button>
                {loading && <LoadingBox />}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

