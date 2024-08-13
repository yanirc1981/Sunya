/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { cleanOrder } from '../../Redux/Actions/actions';
import { v4 as uuidv4 } from 'uuid';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import WompiWidget from '../WompiWidget/WompiWidget';
import './order.css';

export default function Order() {
  const params = useParams();
  const { id: orderId } = params;
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const [loading, setLoading] = useState(false);
  const [priceInCents, setPriceInCents] = useState(0);
  const [reference, setReference] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState(false);
  const order = useSelector((state) => state.order);
  const orderAddress = 'Oficina ' + order.id;
  const [isPending, setIsPending] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const publicKey = import.meta.env.VITE_API_PUBLICKEY;
  const nameWompyWidget = order.shippingAddress.first_name + " " + order.shippingAddress.last_name;

  useEffect(() => {
    const generatedReference = uuidv4();
    setReference(generatedReference);
    const cents = order.totalPrice * 100;
    setPriceInCents(cents);
    return () => {
      dispatch(cleanOrder());
    };
  }, [dispatch, order]);

  useEffect(() => {
    const moneda = 'COP';
    const secretKey = import.meta.env.VITE_API_SECRETKEY;

    const generateHash = async () => {
      const totalPrice = priceInCents.toString();

      var cadenaConcatenada = reference + totalPrice + moneda + secretKey;
      const encondedText = new TextEncoder().encode(cadenaConcatenada);
      const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray
        .map((b) => b.toString(16).padStart(2, '0'))
        .join('');

      setHash(hashHex);
    };

    generateHash();
  }, [reference, priceInCents]);

  return loading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container mx-auto my-8 p-4 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-6">Pedido {orderId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Datos de envío</h2>
            <p><strong>Nombres:</strong> {order.shippingAddress.first_name}</p>
            <p><strong>Apellidos:</strong> {order.shippingAddress.last_name}</p>
            <p><strong>Dirección:</strong> {order.shippingAddress.address}, {order.shippingAddress.city_code}, {order.shippingAddress.state_code}, {order.shippingAddress.phone}</p>
            {order.isDelivered ? (
              <MessageBox variant="success">Despachado el {order.deliveredAt}</MessageBox>
            ) : (
              <MessageBox variant="danger">No despachado</MessageBox>
            )}
          </div>

          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Pago</h2>
            <p><strong>Método:</strong> {order.paymentMethod}</p>
            {order.isPaid ? (
              <MessageBox variant="success">Pagado el {order.paidAt}</MessageBox>
            ) : (
              <MessageBox variant="danger">No pagado</MessageBox>
            )}
          </div>

          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Items</h2>
            <ul className="space-y-4">
              {order.orderItems.map((item) => (
                <li key={item.Product.id} className="flex items-center">
                  <img
                    src={item.Product.image}
                    alt={item.Product.name}
                    className="w-16 h-16 rounded-lg mr-4"
                  />
                  <Link to={`/product/${item.id_product}`} className="text-blue-500">
                    {item.Product.name}
                  </Link>
                  <span className="ml-auto">{item.quantity}</span>
                  <span className="ml-4 font-bold">${item.Product.price}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <div className="mb-6 p-4 border border-gray-300 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Resumen pedido</h2>
            <ul className="space-y-4">
              <li className="flex justify-between">
                <span>Items</span>
                <span>${order.itemsPrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <span>Impuesto IVA 19%</span>
                <span>${order.taxPrice.toFixed(2)}</span>
              </li>
              <li className="flex justify-between">
                <strong>Total pedido</strong>
                <strong>${order.totalPrice.toFixed(2)}</strong>
              </li>
              {order.paymentMethod === 'wompi' && !order.isPaid && (
                <div className="mt-4">
                  {isPending ? (
                    <LoadingBox />
                  ) : (
                    <WompiWidget
                      productPriceInCents={priceInCents}
                      reference={reference}
                      publicKey={publicKey}
                      signature={hash}
                      Email={order.shippingAddress.email}
                      Phone={order.shippingAddress.phone}
                      Address={order.shippingAddress.address}
                      Order={orderAddress}
                      Name={nameWompyWidget}
                      Municipio={order.shippingAddress.city_code}
                      Departamento={order.shippingAddress.country_code}
                    />
                  )}
                  {loadingPay && <LoadingBox />}
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

