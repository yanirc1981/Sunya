import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { postUserInfo } from '../../Redux/Actions/actions';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import Swal from 'sweetalert2';

const validate = (input) => {
  let error = {};

  // validación email
  if (!input.email) {
    error.email =
      'Este campo es obligatorio. Por favor ingrese un correo electronico';
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)
  ) {
    error.email = 'El correo no es válido';
  }

  // validación de password
  if (!input.password) {
    error.password =
      'Este campo es obligatorio. por favor ingrese una contraseña válida.';
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
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">Iniciar Sesión</h2>
        <form
          className="bg-white p-8 rounded shadow-md"
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              required
              type="text"
              name="email"
              value={input.email}
              placeholder="name@example.com"
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                error.email ? 'border-red-500' : ''
              }`}
            />
            {error.email && (
              <p className="text-red-500 text-xs mt-1">{error.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              required
              type="password"
              name="password"
              value={input.password}
              onChange={handleChange}
              className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm ${
                error.password ? 'border-red-500' : ''
              }`}
            />
            {error.password && (
              <p className="text-red-500 text-xs mt-1">{error.password}</p>
            )}
          </div>

          <div className="flex justify-between items-center mb-4">
            <label className="text-sm text-gray-600">
              <input type="checkbox" className="mr-2" />
              Recordarme
            </label>
            <h6 className="cursor-pointer text-blue-600" onClick={handleClick1}>
              <FaUser /> Crear cuenta
            </h6>
          </div>

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Ingresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

