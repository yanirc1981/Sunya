import { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router-dom';
import CheckoutSteps from '../CheckoutSteps/CheckoutSteps';
import { useDispatch, useSelector } from 'react-redux';
import './customerdata.css';
import { updateShippingAddress } from '../../Redux/Actions/actions';
import {
  cleanCustomerDetails,
  cleanCustomersSiigo,
  cleanUsers,
  getCustomerDetailsByIdentification,
  getCustomersSiigo,
  getUsersSiigo,
} from '../../Redux/ActionsSiigo/actionsSiigo';

export default function CustomerData() {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInfo);
  const usersSiigo = useSelector((state) => state.usersSiigo);
  const shippingAddress = useSelector((state) => state.shippingAddress);
  const customerDetails = useSelector((state) => state.customer);
  console.log(JSON.stringify(customerDetails, null, 2))
  const { loading, error } = customerDetails || {};

  const [identification, setIdentification] = useState(
    shippingAddress?.identification || ''
  );
  const [lastname, setLastName] = useState(shippingAddress?.last_name || ''); //
  const [firstname, setFirstName] = useState(shippingAddress?.first_name || ''); //
  const [nameCompany, setNameCompany] = useState(
    shippingAddress?.nameCompany || ''
  );
  const [nameCommercial, setNameCommercial] = useState(shippingAddress?.nameCommercial ||'');

  const [address, setAddress] = useState(shippingAddress?.address || ''); //

  const [personType, setPersonType] = useState(shippingAddress?.personType ||''); //
  const [idType, setIdType] = useState(shippingAddress?.idType ||''); //
  const [checkDigit, setCheckDigit] = useState(shippingAddress?.checkDigit ||''); //
  const [fiscalResponsibilities, setFiscalResponsibilities] = useState(shippingAddress?.fiscalResponsibilities ||''); //
  const [stateCode, setStateCode] = useState(shippingAddress?.state_code ||''); //
  const [cityCode, setCityCode] = useState(shippingAddress?.city_code ||''); //
  const [countryCode, setCountryCode] = useState(shippingAddress?.country_code ||''); //
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode ||''); //
  const [indicative, setIndicative] = useState(shippingAddress?.indicative ||''); //
  const [phone, setPhone] = useState(shippingAddress?.phone ||''); //
  const [extension, setExtension] = useState(shippingAddress?.extension ||''); //
  const [comments, setComments] = useState(shippingAddress?.comments ||''); //
  const [sellerId, setSellerId] = useState(shippingAddress?.seller_id ||0); //
  const [collectorId, setCollectorId] = useState(shippingAddress?.collector_id ||0); //
  const [lastnameContact, setLastNameContact] = useState(shippingAddress?.lastnameContact ||'');
  const [firstnameContact, setFirstNameContact] = useState(shippingAddress?.firstnameContact ||'');
  const [indicativeContact, setIndicativeContact] = useState(shippingAddress?.indicativeContact ||''); //
  const [phoneContact, setPhoneContact] = useState(shippingAddress?.phoneContact ||''); //
  const [extensionContact, setExtensionContact] = useState(shippingAddress?.extensionContact ||''); //
  const [emailContact, setEmailContact] = useState(shippingAddress?.emailContact ||'');

  useEffect(() => {
    if (!userInfo.token) {
      history.push('/registrar?redirect=/shipping');
    }

    dispatch(getCustomersSiigo());
    dispatch(getUsersSiigo(/*headers*/));

    return () => {
      dispatch(cleanCustomersSiigo());
      dispatch(cleanUsers());
      dispatch(cleanCustomerDetails());
    };
  }, [userInfo, history, dispatch]);

  useEffect(() => {
    if (customerDetails) {
      // Usa optional chaining y verifica si name es un array
      setFirstName(
        Array.isArray(customerDetails.name) ? customerDetails.name[0] ?? '' : ''
      );
      setLastName(
        Array.isArray(customerDetails.name) ? customerDetails.name[1] ?? '' : ''
      );
      setNameCompany(
        Array.isArray(customerDetails.name) ? customerDetails.name[0] ?? '' : ''
      );
      setNameCommercial(customerDetails.commercial_name ?? '');
      // Manejo de otros campos
      setAddress(customerDetails.address?.address ?? '');
      //setEmail(customerDetails.contacts?.[0]?.email ?? '');
      setPersonType(customerDetails.person_type ?? '');
      setIdType(customerDetails.id_type?.code ?? '');
      setCheckDigit(customerDetails.check_digit ?? '');
      setFiscalResponsibilities(
        customerDetails.fiscal_responsibilities?.[0]?.code ?? ''
      );
      setStateCode(customerDetails.address?.city?.state_code ?? '');
      setCityCode(customerDetails.address?.city?.city_code ?? '');
      setCountryCode(customerDetails.address?.city?.country_code ?? '');
      setPostalCode(customerDetails.address?.postal_code ?? '');
      setIndicative(customerDetails.phones?.[0]?.indicative ?? '');
      setPhone(customerDetails.phones?.[0]?.number ?? '');
      setExtension(customerDetails.phones?.[0]?.extension ?? '');
      setComments(customerDetails.comments ?? '');
      setSellerId(customerDetails.related_users?.seller_id ?? 0);
      setCollectorId(customerDetails.related_users?.collector_id ?? 0);
      setFirstNameContact(customerDetails.contacts?.[0]?.first_name ?? '');
      setLastNameContact(customerDetails.contacts?.[0]?.last_name ?? '');
      setIndicativeContact(
        customerDetails.contacts?.[0]?.phone?.indicative ?? ''
      );
      setPhoneContact(customerDetails.contacts?.[0]?.phone?.number ?? '');
      setExtensionContact(
        customerDetails.contacts?.[0]?.phone?.extension ?? ''
      );
      setEmailContact(customerDetails.contacts?.[0]?.email ?? '');
    }
  }, [customerDetails]);

  const handleIdentificationChange = (e) => {
    const id = e.target.value;
    setIdentification(id);
    if (id) {
      dispatch(getCustomerDetailsByIdentification(id));
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const shippingData = {
      identification: identification,
      id_siigo: customerDetails.id,
      first_name: firstname, //
      last_name: lastname, //
      address: address, //
      nameCompany: nameCompany,
      nameCommercial: nameCommercial,
      phone: phone, //
      person_type: personType, //
      id_type: idType, //
      check_digit: checkDigit, //
      fiscal_responsibilities: fiscalResponsibilities, //
      state_code: stateCode, //
      city_code: cityCode, //
      postal_code: postalCode, //
      country_code: countryCode, //
      indicative: indicative, //
      firstnameContact: firstnameContact,
      lastnameContact: lastnameContact,
      phoneContact: phoneContact,
      indicativeContact: indicativeContact,
      extensionContact: extensionContact,
      emailContact: emailContact,
      extension: extension, //
      comments: comments,
      seller_id: sellerId,
      collector_id: collectorId,
    };

    dispatch(updateShippingAddress(shippingData));
    history.push('/payment');
  };

  return (
    <div className="container-shipping">
      <CheckoutSteps step1 step2 />
      <div className="container large-container">
        <h2 className="my-3">Datos Cliente</h2>
        {error && <p className="text-danger">Error: {error}</p>}
        <Form onSubmit={submitHandler}>
          <div className="row">
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="identification">
                <Form.Label>
                  <strong>Identificación *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  value={identification}
                  onChange={handleIdentificationChange}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
              <Form.Group controlId="personType">
                <Form.Label>
                  <strong>Tipo de Persona *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Select
                  value={personType}
                  onChange={(e) => setPersonType(e.target.value)}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value="Person">Persona</option>
                  <option value="Company">Empresa</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
              <Form.Group controlId="fiscalResponsibilities">
                <Form.Label>
                  <strong>Responsabilidad fiscal *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Select
                  value={fiscalResponsibilities}
                  onChange={(e) => setFiscalResponsibilities(e.target.value)}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="R-99-PN">No Aplica - Otros*</option>
                  <option value="O-13">Gran contribuyente</option>
                  <option value="O-15">Autorretenedor</option>
                  <option value="O-23">Agente de retención IVA</option>
                  <option value="O-47">Régimen simple de tributación</option>
                </Form.Select>
              </Form.Group>
            </div>
            {personType === 'Person' && (
              <>
                {' '}
                <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
                  <Form.Group controlId="firstname">
                    <Form.Label>
                      <strong>Nombres *</strong>{' '}
                      <span className="required-field">
                        (campo obligatorio)
                      </span>
                    </Form.Label>
                    <Form.Control
                      value={firstname}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
                  <Form.Group controlId="lastname">
                    <Form.Label>
                      <strong>Apellidos *</strong>{' '}
                      <span className="required-field">
                        (campo obligatorio)
                      </span>
                    </Form.Label>
                    <Form.Control
                      value={lastname}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
              </>
            )}

            {personType === 'Company' && (
              <>
                {' '}
                <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
                  <Form.Group controlId="nameCompany">
                    <Form.Label>
                      <strong>Razon social *</strong>{' '}
                      <span className="required-field">
                        (campo obligatorio)
                      </span>
                    </Form.Label>
                    <Form.Control
                      value={nameCompany}
                      onChange={(e) => setNameCompany(e.target.value)}
                      required
                    />
                  </Form.Group>
                </div>
                <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
                  <Form.Group controlId="lastname">
                    <Form.Label>
                      <strong>Nombre comercial</strong>{' '}
                      <span className="required-fieldA">(opcional)</span>
                    </Form.Label>
                    <Form.Control
                      value={nameCommercial}
                      onChange={(e) => setNameCommercial(e.target.value)}
                    />
                  </Form.Group>
                </div>
              </>
            )}

            <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
              <Form.Group controlId="idType">
                <Form.Label>
                  <strong>Tipo de documento *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Select
                  value={idType}
                  onChange={(e) => setIdType(e.target.value)}
                  required
                >
                  <option value="">Seleccione una opción</option>
                  <option value="13">Cedula</option>
                  <option value="31">Nit</option>
                  <option value="22">Cédula de extranjería</option>
                  <option value="42">
                    Documento de identificación extranjero
                  </option>
                  <option value="50">NIT de otro país</option>
                  <option value="R-00-PN">
                    No obligado a registrarse en el RUT PN
                  </option>
                  <option value="91">NUIP</option>
                  <option value="41">Pasaporte</option>
                  <option value="47">
                    Permiso especial de permanencia PEP
                  </option>
                  <option value="11">Registro civil</option>
                  <option value="43">
                    Sin identificación del exterior o para uso definido por la
                    DIAN
                  </option>
                  <option value="21">Tarjeta de extranjería</option>
                  <option value="12">Tarjeta de identidad</option>
                </Form.Select>
              </Form.Group>
            </div>
            {idType === '31' && (
              <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
                <Form.Group controlId="checkDigit">
                  <Form.Label>
                    <strong>Digito de verificacion</strong>{' '}
                    <span className="required-fieldA">(opcional)</span>
                  </Form.Label>
                  <Form.Select
                    value={checkDigit}
                    onChange={(e) => setCheckDigit(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="0">0</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                  </Form.Select>
                </Form.Group>
              </div>
            )}
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="indicative">
                <Form.Label>
                  <strong>Indicativo</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Select
                  value={indicative}
                  onChange={(e) => setIndicative(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="57">57 - Celular</option>
                  <option value="601">601 - Cundinamarca - Bogotá</option>
                  <option value="602">602 - Cauca - Nariño - Valle</option>
                  <option value="604">604 - Antioquia - Córdoba - Chocó</option>
                  <option value="605">605 - Atlántico - Bolívar - César</option>
                  <option value="605">605 - Guajira - Magdalena - Sucre</option>
                  <option value="606">
                    606 - Caldas - Quindío - Risaralda
                  </option>
                  <option value="607">
                    607 - Arauca - Santander - Norte de Santander
                  </option>
                  <option value="608">
                    608 - Amazonas - Boyacá - Casanare
                  </option>
                  <option value="608">
                    608 - Caquetá - Guainía - Guaviare
                  </option>
                  <option value="608">
                    608 - Huila - Meta - Tolima - Putumayo
                  </option>
                  <option value="608">
                    608 - San Andrés - Vaupés - Vichada
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="phone">
                <Form.Label>
                  <strong>Teléfono</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="extension">
                <Form.Label>
                  <strong>Extensión</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={extension}
                  onChange={(e) => setExtension(e.target.value)}
                />
              </Form.Group>
            </div>

            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="address">
                <Form.Label>
                  <strong>Dirección *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
              <Form.Group controlId="cityCode">
                <Form.Label>
                  <strong>Ciudad ó Municipio *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Select
                  value={cityCode}
                  onChange={(e) => setCityCode(e.target.value)}
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
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
              <Form.Group controlId="stateCode">
                <Form.Label>
                  <strong>Departamento *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
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
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="postalCode">
                <Form.Label>
                  <strong>Código Postal</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-3">
              <Form.Group controlId="countryCode">
                <Form.Label>
                  <strong>País *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Select
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                  required
                >
                  <option value="">Selecciona una opción</option>
                  <option value="Co">Co - Colombia</option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="firstnameContact">
                <Form.Label>
                  <strong>Nombres Contacto *</strong>{' '}
                  <span className="required-field">(campo obligatorio)</span>
                </Form.Label>
                <Form.Control
                  value={firstnameContact}
                  onChange={(e) => setFirstNameContact(e.target.value)}
                  required
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="lastnameContact">
                <Form.Label>
                  <strong>Apellidos Contacto</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={lastnameContact}
                  onChange={(e) => setLastNameContact(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="indicativeContact">
                <Form.Label>
                  <strong>Indicativo Contacto</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Select
                  value={indicativeContact}
                  onChange={(e) => setIndicativeContact(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  <option value="57">57 - Celular</option>
                  <option value="601">601 - Cundinamarca - Bogotá</option>
                  <option value="602">602 - Cauca - Nariño - Valle</option>
                  <option value="604">604 - Antioquia - Córdoba - Chocó</option>
                  <option value="605">605 - Atlántico - Bolívar - César</option>
                  <option value="605">605 - Guajira - Magdalena - Sucre</option>
                  <option value="606">
                    606 - Caldas - Quindío - Risaralda
                  </option>
                  <option value="607">
                    607 - Arauca - Santander - Norte de Santander
                  </option>
                  <option value="608">
                    608 - Amazonas - Boyacá - Casanare
                  </option>
                  <option value="608">
                    608 - Caquetá - Guainía - Guaviare
                  </option>
                  <option value="608">
                    608 - Huila - Meta - Tolima - Putumayo
                  </option>
                  <option value="608">
                    608 - San Andrés - Vaupés - Vichada
                  </option>
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="phoneContact">
                <Form.Label>
                  <strong>Teléfono contacto</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={phoneContact}
                  onChange={(e) => setPhoneContact(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="extension">
                <Form.Label>
                  <strong>Extensión contacto</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={extensionContact}
                  onChange={(e) => setExtensionContact(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="emailContact">
                <Form.Label>
                  <strong>Correo electrónico contacto</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  value={emailContact}
                  onChange={(e) => setEmailContact(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="sellerId">
                <Form.Label>
                  <strong>Vendedor Asignado</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Select
                  value={sellerId}
                  onChange={(e) => setSellerId(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {usersSiigo?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} - {user.identification}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="collectorId">
                <Form.Label>
                  <strong>Cobrador Asignado</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Select
                  value={collectorId}
                  onChange={(e) => setCollectorId(e.target.value)}
                >
                  <option value="">Selecciona una opción</option>
                  {usersSiigo?.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} - {user.identification}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </div>
            <div className="col-lg-3 col-md-6 col-lg-4 mb-4">
              <Form.Group controlId="comments">
                <Form.Label>
                  <strong>Comentarios</strong>{' '}
                  <span className="required-fieldA">(opcional)</span>
                </Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>
          <div className="mb-3">
            <Button variant="primary" type="submit" disabled={loading}>
              Continuar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
