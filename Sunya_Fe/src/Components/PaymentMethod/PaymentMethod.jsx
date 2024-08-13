import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveMethodPayment } from '../../Redux/Actions/actions';
import { cleanPaymentsTypeSiigo, getPaymentsTypeSiigo } from '../../Redux/ActionsSiigo/actionsSiigo';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';

export default function PaymentMethod() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const paymentsType = useSelector((state) => state.paymentsType);
  const role = userInfo?.user?.id_role;
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethodName, setPaymentMethod] = useState(paymentMethod || "");

  useEffect(() => {
    const token = userInfo.token;
    const headers = { Authorization: `Bearer ${token}` };
    setIsLoading(true);
    dispatch(getPaymentsTypeSiigo({ headers }))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));

    return () => {
      dispatch(cleanPaymentsTypeSiigo());
    };
  }, [dispatch, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveMethodPayment(paymentMethodName));
    if (role === 3 || role === 2 || role === 4) {
      history.push('/placeorderstore');
    } else {
      history.push('/placeorder');
    }
  };

  // Filtra los métodos de pago permitidos
  const allowedPayments = role === 1 
  ? [{ id: 8050, name: 'wompi', type: 'Cartera', active: true, due_date: false }] 
  : paymentsType;

  return (
    <div className="p-6 mx-auto max-w-4xl">
      <CheckoutSteps step1 step2 step3 />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold my-6">Método de pago</h2>
        <form onSubmit={submitHandler} className="w-full max-w-md space-y-6">
          <div className="mb-4">
            <label
              htmlFor="paymentMethodSelect"
              className="block text-sm font-medium text-gray-700"
            >
              Selecciona un método de pago
            </label>
            <select
              id="paymentMethodSelect"
              value={paymentMethodName}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Selecciona una opción</option>
              {allowedPayments.map((payment) => (
                <option key={payment.id} value={payment.name}>
                  {payment.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-botonVerde text-white font-bold py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continuar
          </button>
        </form>
      </div>
    </div>
  );
}

