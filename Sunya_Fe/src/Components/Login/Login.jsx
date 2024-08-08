import './login.css';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postUserInfo } from '../../Redux/Actions/actions';
import {  useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const validate = (input) => {
  let error = {};

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

  return error;
};
const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [validated, setValidated] = useState(false);

  const [input, setInput] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState({
    email: '',
    password: '',
  });

  function handleClick1() {
    history.push('/registrar');
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

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      return;
    }

    try {
      const response = await dispatch(postUserInfo(input));

      if (response.success) {
        setInput({
          email: '',
          password: '',
        });
        setValidated(true);
        Swal.fire({
          icon: 'success',
          title: '¡Éxito!',
          text: '¡Inicio de sesión exitoso!.',
        });
        history.push('/');
        
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El inicio de sesión NO fue exitoso. Verifique email y password.',
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
    <div className="login_container">
      <h1 className="login_tittle">INICIAR SESION</h1>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalEmail">
          <Form.Label column sm={{ span: 1, offset: 3 }}>
            Email
          </Form.Label>
          <Col sm={{ span: 5, offset: 0 }}>
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
          </Col>
        </Form.Group>

        <Form.Group
          as={Row}
          className="mb-3"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={{ span: 1, offset: 3 }}>
            Password
          </Form.Label>
          <Col sm={{ span: 5, offset: 0 }}>
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
          </Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 1 }}></Col>
        </Form.Group>

        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <label>
            <h6>¿Aún no estas registrado?</h6>
          </label>

          <h6 className="span_login" onClick={handleClick1}>
            <FaUser /> Crear cuenta
          </h6>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
          <Col sm={{ span: 10, offset: 1 }}>
            <Form.Check label="Remember me" />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col sm={{ span: 10, offset: 1 }}>
            <Button type="submit" className="login_button">
              Ingresar
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default Login;
