import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';

import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import './shippingadress.css';
import { updateShippingAddress } from '../../Redux/Actions/actions';


export default function ShippingAddress() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const idUser = userInfo?.user.id
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
  //const [country, setCountry] = useState(shippingAddress?.country || '');

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
    <div className="container-shipping">
      <CheckoutSteps step1 step2></CheckoutSteps>
      <div className="container small-container">
        <h2 className="my-3">Datos de envío</h2>
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3" controlId="firstname">
            <Form.Label>Nombres</Form.Label>
            <Form.Control
              value={firstname}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="lastname">
            <Form.Label>Apellidos</Form.Label>
            <Form.Control
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="nameCompany">
            <Form.Label>Razon social</Form.Label>
            <Form.Control
              value={nameCompany}
              onChange={(e) => setNameCompany(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="address">
            <Form.Label>Dirección</Form.Label>
            <Form.Control
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Telefóno</Form.Label>
            <Form.Control
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Correo</Form.Label>
            <Form.Control
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="city">
            <Form.Label>Ciudad o municipio</Form.Label>
            <Form.Select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
                  <option value="50006">Acacías - Meta</option>
                  <option value="85010">Aguazul - Casanare</option>
                  <option value="50110">Barranca De Upía - Meta</option>
                  <option value="05088">Bello - Antioquía</option>
                  <option value="11001">Bogotá - Bogotá D.C</option>
                  <option value="50124">Cabuyaro - Meta</option>
                  <option value="25126">Cajicá - Cundinamarca</option>
                  <option value="95015">Calamar - Guaviare</option>
                  <option value="25151">Caqueza - Cundinamarca</option>
                  <option value="50150">Castilla La Nueva - Meta</option>
                  <option value="50223">Cubarral - Meta</option>
                  <option value="50226">Cumaral - Meta</option>
                  <option value="50245">El Calvario - Meta</option>
                  <option value="50251">El Castillo - Meta</option>
                  <option value="50270">El Dorado - Meta</option>
                  <option value="50287">Fuente De Oro - Meta</option>
                  <option value="50313">Granada - Meta</option>
                  <option value="50318">Guamal - Meta</option>
                  <option value="73001">Ibagué - Tolima</option>
                  <option value="05360">Itagui - Antioquia</option>
                  <option value="25377">La Calera - Cundinamarca</option>
                  <option value="50350">La Macarena - Meta</option>
                  <option value="50400">Lejanías - Meta</option>
                  <option value="85139">Maní - Casanare</option>
                  <option value="50325">Mapiripán - Meta</option>
                  <option value="05001">Medellín - Antioqua</option>
                  <option value="25438">Medina - Cundinamarca</option>
                  <option value="50330">Mesetas - Meta</option>
                  <option value="19001">Popayan - Cauca</option>
                  <option value="50450">Puerto Concordia - Meta</option>
                  <option value="50568">Puerto Gaitán - Meta</option>
                  <option value="50577">Puerto Lleras - Meta</option>
                  <option value="50573">Puerto López - Meta</option>
                  <option value="50590">Puerto Rico - Meta</option>
                  <option value="50606">Restrepo - Meta</option>
                  <option value="50680">San Carlos De Guaroa - Meta</option>
                  <option value="50683">San Juan De Arama - Meta</option>
                  <option value="50686">San Juanito - Meta</option>
                  <option value="50689">San Martín - Meta</option>
                  <option value="50370">Uribe - Meta</option>
                  <option value="50001">Villavicencio - Meta</option>
                  <option value="50711">Vistahermosa - Meta</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3" controlId="state">
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              value={stateCode}
              onChange={(e) => setStateCode(e.target.value)}
              required
            >
              <option value="">Selecciona una opción</option>
                  <option value="05">Antioquía</option>
                  <option value="91">Amazonas</option>
                  <option value="81">Arauca</option>
                  <option value="08">Atlántico</option>
                  <option value="11">Bogotá D.C</option>
                  <option value="13">Bolivar</option>
                  <option value="15">Boyacá</option>
                  <option value="17">Caldas</option>
                  <option value="19">Cauca</option>
                  <option value="85">Casanare</option>
                  <option value="20">Cesar</option>
                  <option value="23">Córdoba</option>
                  <option value="25">Cundinamarca</option>
                  <option value="27">Chocó</option>
                  <option value="94">Guainía</option>
                  <option value="95">Guaviare</option>
                  <option value="41">Huila</option>
                  <option value="44">La Guajira</option>
                  <option value="47">Magdalena</option>
                  <option value="50">Meta</option>
                  <option value="52">Nariño</option>
                  <option value="54">Norte de Santander</option>
                  <option value="86">Putumayo</option>
                  <option value="63">Quindio</option>
                  <option value="66">Risaralda</option>
                  <option value="68">Santander</option>
                  <option value="70">Sucre</option>
                  <option value="73">Tolima</option>
                  <option value="76">Valle del Cauca</option>
                  <option value="97">Vaupés</option>
                  <option value="99">Vichada</option>
            </Form.Select>
          </Form.Group>
          <div className="mb-3">
            <Button variant="primary" type="submit">
              Continuar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
