import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import './payment.css';
import { saveMethodPayment } from '../../Redux/Actions/actions';
import { cleanPaymentsTypeSiigo, getPaymentsTypeSiigo } from '../../Redux/ActionsSiigo/actionsSiigo';

export default function PaymentMethod() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const paymentMethod = useSelector((state) => state.paymentMethod);
  const paymentsType = useSelector((state) => state.paymentsType);
  const role = userInfo?.user?.id_role;
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
    <div className="container_payment">
      <CheckoutSteps step1 step2 step3 />
      <div className="container small-container flex-column-container">
        <h2 className="my-3">Método de pago</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId="paymentMethodSelect">
            <Form.Label>Selecciona un método de pago</Form.Label>
            <Form.Control
              as="select"
              value={paymentMethodName}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="form-control-lg"
            >
              <option>Selecciona una opcion</option>
              {allowedPayments.map((payment) => (
                <option key={payment.id} value={payment.name}>
                  {payment.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <div className="mb-3">
            <Button type="submit">Continuar</Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
