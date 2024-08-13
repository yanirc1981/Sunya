import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import { updateShippingAddress } from '../../Redux/Actions/actions';
import {
  city_codeOptions,
  state_codeOptions,
} from "../../Data/options";

export default function ShippingAddress() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const idUser = userInfo?.user.id;
  const shippingAddress = useSelector((state) => state.shippingAddress);

  const [lastname, setLastName] = useState(shippingAddress?.last_name || userInfo?.user.last || '');
  const [firstname, setFirstName] = useState(shippingAddress?.first_name || userInfo?.user.name || '');
  const [nameCompany, setNameCompany] = useState(shippingAddress?.nameCompany || userInfo?.user.nameCompany || "N/A");
  const [phone, setPhone] = useState(shippingAddress?.phone || userInfo?.user.phone || '');
  const [address, setAddress] = useState(shippingAddress?.address || '');
  const [city, setCity] = useState(shippingAddress?.city_code ||userInfo?.user.city_code || '');
  const [stateCode, setStateCode] = useState(shippingAddress?.state_code || userInfo?.user.state_code || '');
  const [email, setEmail] = useState(shippingAddress?.email || userInfo?.user.email || '');

  useEffect(() => {
    if (!userInfo.token) {
      history.push('/registrar?redirect=/shipping');
    }
  }, [userInfo, history]);

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingData = {
      idUser: idUser,
      first_name: firstname,
      last_name: lastname,
      nameCompany: nameCompany,
      address: address,
      city_code: city,
      state_code: stateCode,
      email: email,
      phone: phone,
    };

    dispatch(updateShippingAddress(shippingData));
    history.push('/payment');
  };

  return (
    <div className="container mx-auto p-4">
      <CheckoutSteps step1 step2 />
      <div className="w-full max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold my-3">Datos de envío</h2>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="firstname">
              Nombres
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="firstname"
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="lastname">
              Apellidos
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="nameCompany">
              Razón social
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="nameCompany"
              value={nameCompany}
              onChange={(e) => setNameCompany(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="address">
              Dirección
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
              Teléfono
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="email">
              Correo
            </label>
            <input
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="city">
              Ciudad o municipio
            </label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              {city_codeOptions.map((city) => (
                <option key={city.value} value={city.value}>
                  {city.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700" htmlFor="state">
              Departamento
            </label>
            <select
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              id="state"
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
              {state_codeOptions.map((state) => (
                <option key={state.value} value={state.value}>
                  {state.label}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

