import { useEffect, useMemo, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import LoadingBox from '../LoadingBox';
import MessageBox from '../MessageBox';
import { useDispatch, useSelector } from 'react-redux';
import {
  cleanOrder,
  putOrderDelivery,
  putOrderPaymentResult,
} from '../../Redux/Actions/actions';
import { v4 as uuidv4 } from 'uuid';
import Swal from 'sweetalert2';
import { transportOptions, departmentMap, municipios } from '../../data';
import DatePicker from 'react-datepicker';

export default function OrderStore() {
  const params = useParams();
  const { id: orderId } = params;
  const history = useHistory();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [priceInCents, setPriceInCents] = useState(0);
  const [reference, setReference] = useState('');
  const [hash, setHash] = useState('');
  const [error, setError] = useState(false);
  const order = useSelector((state) => state.order);
  const userInfo = useSelector((state) => state.userInfo);

  const [isPending, setIsPending] = useState(false);
  const [loadingPay, setLoadingPay] = useState(false);
  const [loadingDeliver, setLoadingDeliver] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalA, setShowModalA] = useState(false);
  const [checkNumber, setCheckNumber] = useState('');
  const [checkBank, setCheckBank] = useState('');
  const [expiryDate, setExpiryDate] = useState(null);
  const [transactionNumber, setTransactionNumber] = useState('');
  const [guideNumber, setGuideNumber] = useState('');
  const [transport, setTransport] = useState('');

  const headers = useMemo(() => {
    return userInfo.token ? { Authorization: `Bearer ${userInfo.token}` } : null;
  }, [userInfo.token]);

  const isAdmin = userInfo?.user?.id_role === 3;

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleShowModalA = () => setShowModalA(true);
  const handleCloseModalA = () => setShowModalA(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!orderId || !order.totalPrice || !order.paymentMethod) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor asegúrate de que todos los campos requeridos estén llenos.',
      });
      return;
    }

    if ((order.paymentMethod === 'Crédito' || order.paymentMethod === 'Pagos a crédito') && !expiryDate) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo requerido',
        text: 'La fecha de vencimiento es obligatoria para el método de pago seleccionado.',
      });
      return;
    }

    const data = {
      totalPrice: order.totalPrice,
      status: 'Aprobada',
      date: new Date().toISOString(),
      expiryDate: expiryDate ? expiryDate.toISOString() : null,
      paymentMethod: order.paymentMethod,
      checkNumber: order.paymentMethod === 'Cheque' ? checkNumber : null,
      checkBank: order.paymentMethod === 'Cheque' ? checkBank : null,
      transactionNumber: order.paymentMethod === 'Transferencia Bancaria' ? transactionNumber : null,
    };

    try {
      setLoadingPay(true);
      const response = await dispatch(putOrderPaymentResult({ orderId, data, headers }));
      setLoadingPay(false);

      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El pago se registró exitosamente.',
        });
        resetPaymentForm();
        handleCloseModal();
        history.push('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar tu solicitud.',
      });
    }
  };

  const handleSubmitDelivery = async (e) => {
    e.preventDefault();

    if (!orderId || !guideNumber || !transport) {
      Swal.fire({
        icon: 'warning',
        title: 'Campos incompletos',
        text: 'Por favor asegúrate de que todos los campos requeridos estén llenos.',
      });
      return;
    }

    const data = {
      date: new Date().toISOString(),
      numberGuide: guideNumber,
      transport: transport,
      shippingPrice: order.shippingPrice,
      shippingAddress: order.shippingAddress?.address,
      shippingAddressCity: municipios[order.shippingAddress?.city_code],
      shippingAddressCountry: departmentMap[order.shippingAddress?.state_code],
      shippingAddressPhone: order.shippingAddress?.phone,
    };

    try {
      setLoadingDeliver(true);
      const response = await dispatch(putOrderDelivery({ orderId, data, headers }));
      setLoadingDeliver(false);

      if (response.success) {
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Datos de envío registrados exitosamente.',
        });
        resetDeliveryForm();
        handleCloseModalA();
        history.push('/');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al procesar tu solicitud.',
        });
      }
    } catch (error) {
      console.error('Error:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al procesar tu solicitud.',
      });
    }
  };

  const resetPaymentForm = () => {
    setCheckNumber('');
    setCheckBank('');
    setTransactionNumber('');
    setExpiryDate(null);
  };

  const resetDeliveryForm = () => {
    setGuideNumber('');
    setTransport('');
  };

  useEffect(() => {
    if (order?.totalPrice) {
      const generatedReference = uuidv4();
      setReference(generatedReference);
      const cents = order.totalPrice * 100;
      setPriceInCents(cents);
    }

    return () => {
      dispatch(cleanOrder());
    };
  }, [dispatch, order]);

  useEffect(() => {
    if (reference && priceInCents) {
      const moneda = 'COP';
      const secretKey = import.meta.env.VITE_API_SECRETKEY;

      const generateHash = async () => {
        const totalPrice = priceInCents.toString();
        const cadenaConcatenada = reference + totalPrice + moneda + secretKey;
        const encondedText = new TextEncoder().encode(cadenaConcatenada);
        const hashBuffer = await crypto.subtle.digest('SHA-256', encondedText);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
        setHash(hashHex);
      };

      generateHash();
    }
  }, [reference, priceInCents]);

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div className="container mx-auto">
      <h1 className="my-3">Pedido {orderId}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="mb-3 p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold">Datos cliente</h2>
            <p>
              <strong>Nombres:</strong> {order.shippingAddress?.first_name}<br />
              <strong>Apellidos:</strong> {order.shippingAddress?.last_name}<br />
              <strong>Dirección:</strong> {order.shippingAddress?.address}<br />
              <strong>Teléfono contacto:</strong> {order.shippingAddress?.phone}<br />
              <strong>Correo electrónico:</strong> {order.shippingAddress?.email}
            </p>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Despachado el {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">No despachado</MessageBox>
            )}
          </div>

          <div className="mb-3 p-4 border border-gray-300 rounded-md">
            <h2 className="text-lg font-semibold">Datos de envío</h2>
            <p>
              <strong>Dirección:</strong> {order.shippingAddress?.address}<br />
              <strong>Ciudad:</strong> {municipios[order.shippingAddress?.city_code]}<br />
              <strong>Departamento:</strong> {departmentMap[order.shippingAddress?.state_code]}
            </p>
            <p>
              <strong>Teléfono contacto:</strong> {order.shippingAddress?.phone}
            </p>
            {order.isDelivered ? (
              <MessageBox variant="success">
                Despachado el {order.deliveredAt}
              </MessageBox>
            ) : (
              <MessageBox variant="danger">No despachado</MessageBox>
            )}
          </div>

          {order.isPaid ? (
            <MessageBox variant="success">
              Pagado el {order.paidAt}
            </MessageBox>
          ) : (
            <MessageBox variant="danger">No pagado</MessageBox>
          )}

          {!order.isPaid && (
            <button
              type="button"
              className="bg-botonVerde mr-2 text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
              onClick={handleShowModal}
            >
              Registrar pago
            </button>
          )}

          {!order.isDelivered && (
            <button
              type="button"
              className="bg-botonVerde  text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
              onClick={handleShowModalA}
            >
              Registrar envío
            </button>
          )}

          {/* Modal de pago */}
          {showModal && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold">Registrar Pago</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">
                      Método de pago
                    </label>
                    <select
                      id="payment-method"
                      name="paymentMethod"
                      className="form-select"
                      value={order.paymentMethod || ''}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="Efectivo">Efectivo</option>
                      <option value="Cheque">Cheque</option>
                      <option value="Transferencia Bancaria">Transferencia Bancaria</option>
                      <option value="Crédito">Crédito</option>
                      <option value="Pagos a crédito">Pagos a crédito</option>
                    </select>
                  </div>
                  
                  {/* Campos condicionales */}
                  {order.paymentMethod === 'Cheque' && (
                    <>
                      <div className="mb-3">
                        <label htmlFor="check-number" className="block text-sm font-medium text-gray-700">
                          Número de Cheque
                        </label>
                        <input
                          type="text"
                          id="check-number"
                          className="form-input"
                          value={checkNumber}
                          onChange={(e) => setCheckNumber(e.target.value)}
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="check-bank" className="block text-sm font-medium text-gray-700">
                          Banco del Cheque
                        </label>
                        <input
                          type="text"
                          id="check-bank"
                          className="form-input"
                          value={checkBank}
                          onChange={(e) => setCheckBank(e.target.value)}
                        />
                      </div>
                    </>
                  )}

                  {order.paymentMethod === 'Transferencia Bancaria' && (
                    <div className="mb-3">
                      <label htmlFor="transaction-number" className="block text-sm font-medium text-gray-700">
                        Número de Transacción
                      </label>
                      <input
                        type="text"
                        id="transaction-number"
                        className="form-input"
                        value={transactionNumber}
                        onChange={(e) => setTransactionNumber(e.target.value)}
                      />
                    </div>
                  )}

                  {(order.paymentMethod === 'Crédito' || order.paymentMethod === 'Pagos a crédito') && (
                    <div className="mb-3">
                      <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                        Fecha de Vencimiento
                      </label>
                      <DatePicker
                        selected={expiryDate}
                        onChange={(date) => setExpiryDate(date)}
                        dateFormat="yyyy/MM/dd"
                        className="form-input"
                      />
                    </div>
                  )}

                  <button type="submit" className="bg-botonVerde mr text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600">
                    Registrar Pago
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary ml-3"
                    onClick={handleCloseModal}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Modal de envío */}
          {showModalA && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg">
                <h2 className="text-lg font-semibold">Registrar Envío</h2>
                <form onSubmit={handleSubmitDelivery}>
                  <div className="mb-3">
                    <label htmlFor="guide-number" className="block text-sm font-medium text-gray-700">
                      Número de Guía
                    </label>
                    <input
                      type="text"
                      id="guide-number"
                      className="form-input"
                      value={guideNumber}
                      onChange={(e) => setGuideNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="transport" className="block text-sm font-medium text-gray-700">
                      Transportadora
                    </label>
                    <select
                      id="transport"
                      name="transport"
                      className="form-select"
                      value={transport}
                      onChange={(e) => setTransport(e.target.value)}
                    >
                      {transportOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <button type="submit" className="bg-botonVerde mr text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                 >
                    Registrar Envío
                  </button>
                  <button
                    type="button"
                    className="bg-botonVerde text-white font-bold py-2 px-6 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600"
                    onClick={handleCloseModalA}
                  >
                    Cancelar
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


