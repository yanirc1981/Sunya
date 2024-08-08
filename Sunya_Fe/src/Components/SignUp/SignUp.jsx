import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import './signup.css';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { createUser } from '../../Redux/Actions/actions';
import { FaLock } from 'react-icons/fa';
import Swal from 'sweetalert2';

const validate = (input) => {
  let error = {};

  // validacion tipo de persona

  // validaion Razon Social
  if (!input.person_type) {
    error.person_type =
      'Este campo es obligatorio. Por favor seleccione el tipo de persona';
  }

  //validacion nombres
  if (!input.first_name) {
    error.first_name = 'Este campo es obligatorio. Por favor ingrese un nombre';
  } else {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (!nameRegex.test(input.first_name)) {
      error.first_name = 'El nombre solo puede contener letras y espacios';
    }
  }

  //validacion apellidos
  if (!input.last_name) {
    error.last_name =
      'Este campo es obligatorio. Por favor ingrese un apellido';
  } else {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (!nameRegex.test(input.last_name)) {
      error.last_name = 'El apellido solo puede contener letras y espacios';
    }
  }

  // validaion Razon Social
  if (!input.nameCompany) {
    error.nameCompany =
      'Este campo es obligatorio. Por favor ingrese la Razón social';
  }

  //  validacion documento
  if (!input.n_document) {
    error.n_document = 'Este campo es obligatorio. ';
  } else if (!/^[0-9]*$/.test(input.n_document)) {
    error.n_document =
      'Por favor ingrese número valido sin caracteres especiales si es NIT sin digito de verificacion';
  }

  // tipo dociumento

  if (!input.idType) {
    error.idType =
      'Este campo es obligatorio. Por favor seleccione tipo de documento';
  }

  // validacion email
  if (!input.email) {
    error.email =
      'Este campo es obligatorio. Por favor ingrese un correo electronico';
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)
  ) {
    error.email = 'El correo no es valido';
  }

  // validacion de password
  if (!input.password) {
    error.password =
      'Este campo es obligatorio. por favor ingrese una contraseña valida.';
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      input.password
    )
  ) {
    error.password =
      'La contraseña debe tener al menos 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y al menos un carácter especial.';
  }

  // validación teléfono
  if (!input.phone) {
    error.phone =
      'Este campo es obligatorio. Por favor ingrese un número de celular';
  } else if (!/^[0-9]{10}$/.test(input.phone)) {
    error.phone = 'Por favor ingrese un número valido';
  }

  // validación ciudad
  if (!input.city_code) {
    error.city_code =
      'Este campo es obligatorio. Por favor ingrese su ciudad de residencia';
  }

  // validación departamento
  if (!input.state_code) {
    error.state_code =
      'Este campo es obligatorio. Por favor ingrese su Departamento de residencia';
  }
  return error;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [submissionResult, setSubmissionResult] = useState(null);

  const [input, setInput] = useState({
    n_document: '',
    idType: '',
    first_name: '',
    last_name: '',
    nameCompany: '',
    commercialName: '',
    person_type: '',
    email: '',
    password: '',
    phone: '',
    city_code: '',
    state_code: '',
    id_role: 1,
  });

  const [error, setError] = useState({
    n_document: '',
    idType: '',
    first_name: '',
    last_name: '',
    nameCompany: '',
    commercialName: '',
    person_type: '',
    email: '',
    password: '',
    phone: '',
    city_code: '',
    state_code: '',
  });
  function handleClick1() {
    history.push('/login');
  }
  const handleChange = (e) => {
    const value = e.target.value;
    const property = e.target.name;
    setError(validate({ ...input, [property]: value }));

    setInput({ ...input, [property]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    console.log(input);

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      return;
    }

    try {
      const response = await dispatch(createUser(input));
      console.log(response);
      if (response.success) {
        setInput({
          n_document: '',
          idType: '',
          first_name: '',
          last_name: '',
          nameCompany: '',
          commercialName: '',
          person_type: '',
          email: '',
          password: '',
          phone: '',
          city_code: '',
          state_code: '',
        });
        setValidated(true);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El registro fue exitoso!.',
        });
        history.push('/login');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El registro NO fue exitoso. Verifique documento o correo, el sistema no permite crear un usuario ya registrado con esos datos.',
        });
      }
    } catch (error) {
      console.error('Hubo un error al enviar el formulario:', error);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'El inicio de sesión NO fue exitoso. Verifique email y password.',
      });
    }
  };

  return (
    <div className="signup_container">
      <h1 className="signup_tittle">CREAR CUENTA</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustomPersonType">
            <Form.Label>Tipo persona</Form.Label>
            <Form.Select
              required
              name="person_type"
              value={input.person_type}
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.person_type}
            >
              <option value="">Seleccione una opción</option>
              <option value="Person">Persona</option>
              <option value="Company">Empresa</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {error.person_type}
            </Form.Control.Feedback>
          </Form.Group>
          {input.person_type === 'Person' && (
            <>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Nombres</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="first_name"
                  value={input.first_name}
                  placeholder="Nombres"
                  onChange={(e) => handleChange(e)}
                  isInvalid={!!error.first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {error.first_name}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Apellidos</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="last_name"
                  value={input.last_name}
                  placeholder="Apellidos"
                  onChange={(e) => handleChange(e)}
                  isInvalid={!!error.last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {error.last_name}
                </Form.Control.Feedback>
              </Form.Group>
            </>
          )}
          {input.person_type === 'Company' && (
            <>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label>Razon Social</Form.Label>
                <Form.Control
                  required
                  type="text"
                  name="nameCompany"
                  value={input.nameCompany}
                  placeholder="Razón social"
                  onChange={(e) => handleChange(e)}
                  isInvalid={!!error.nameCompany}
                />
                <Form.Control.Feedback type="invalid">
                  {error.nameCompany}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label>Nombre comercial</Form.Label> (opcional)
                <Form.Control
                  type="text"
                  name="commercialName"
                  value={input.commercialName}
                  placeholder="Nombre comercial"
                  onChange={(e) => handleChange(e)}
                />
              </Form.Group>
            </>
          )}
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Número documento</Form.Label>
            <Form.Control
              required
              type="text"
              name="n_document"
              value={input.n_document}
              placeholder="# Documento"
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.n_document}
            />
            <Form.Control.Feedback type="invalid">
              {error.n_document}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomIdType">
            <Form.Label>Tipo documento</Form.Label>
            <Form.Select
              required
              name="idType"
              value={input.idType}
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.idType}
            >
              <option value="">Seleccione una opción</option>
              <option value="13">Cedula</option>
              <option value="31">Nit</option>
              <option value="22">Cédula de extranjería</option>
              <option value="42">Documento de identificación extranjero</option>
              <option value="50">NIT de otro país</option>
              <option value="R-00-PN">
                No obligado a registrarse en el RUT PN
              </option>
              <option value="91">NUIP</option>
              <option value="41">Pasaporte</option>
              <option value="47">Permiso especial de permanencia PEP</option>
              <option value="11">Registro civil</option>
              <option value="43">
                Sin identificación del exterior o para uso definido por la DIAN
              </option>
              <option value="21">Tarjeta de extranjería</option>
              <option value="12">Tarjeta de identidad</option>
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {error.idType}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control
              required
              type="text"
              name="email"
              value={input.email}
              placeholder="name@example.com"
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.email}
            />
            <Form.Control.Feedback type="invalid">
              {error.email}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              type="text"
              name="password"
              value={input.password}
              placeholder=""
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.password}
            />
            <Form.Control.Feedback type="invalid">
              {error.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomEmail">
            <Form.Label>Teléfono</Form.Label>
            <Form.Control
              required
              type="text"
              name="phone"
              value={input.phone}
              placeholder=""
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.phone}
            />
            <Form.Control.Feedback type="invalid">
              {error.phone}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomCityCode">
            <Form.Label>Ciudad ó Municipio</Form.Label>
            <Form.Select
              required
              name="city_code"
              value={input.city_code}
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.city_code}
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
            <Form.Control.Feedback type="invalid">
              {error.city_code}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustomStateCode">
            <Form.Label>Departamento</Form.Label>
            <Form.Select
              required
              name="state_code"
              value={input.state_code}
              onChange={(e) => handleChange(e)}
              isInvalid={!!error.state_code}
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
            <Form.Control.Feedback type="invalid">
              {error.state_code}
            </Form.Control.Feedback>
          </Form.Group>
        </Row>
        <Form.Group as={Row} className="mb-3">
          {' '}
          <label>
            <h6>¿Ya estas registrado?</h6>
          </label>
          <h6 className="span_login" onClick={handleClick1}>
            <FaLock /> Iniciar sesión
          </h6>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit" className="signup_button">
          Crear cuenta
        </Button>
        {submissionResult === 'success' && (
          <div className="message-container">
            <div className="success">El registro fue exitoso!.</div>
          </div>
        )}
        {submissionResult === 'error' && (
          <div className="message-container">
            <div className="error">
              El registro NO fue exitoso. Inténtelo nuevamente.
            </div>
          </div>
        )}
      </Form>
    </div>
  );
};

export default SignUp;
