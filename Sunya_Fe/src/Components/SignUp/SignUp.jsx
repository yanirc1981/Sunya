/* eslint-disable react/no-unknown-property */
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { createUser } from "../../Redux/Actions/actions";

import Swal from "sweetalert2";
import {
  identificationOptions,
  state_codeOptions,
  city_codeOptions,
} from "../../Data/options";

const validate = (input) => {
  let error = {};

  // validacion tipo de persona

  // validaion Razon Social
  if (!input.person_type) {
    error.person_type =
      "Este campo es obligatorio. Por favor seleccione el tipo de persona";
  }

  //validacion nombres
  if (!input.first_name) {
    error.first_name = "Este campo es obligatorio. Por favor ingrese un nombre";
  } else {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (!nameRegex.test(input.first_name)) {
      error.first_name = "El nombre solo puede contener letras y espacios";
    }
  }

  //validacion apellidos
  if (!input.last_name) {
    error.last_name =
      "Este campo es obligatorio. Por favor ingrese un apellido";
  } else {
    const nameRegex = /^[a-zA-ZÀ-ÿ\s]{1,40}$/;
    if (!nameRegex.test(input.last_name)) {
      error.last_name = "El apellido solo puede contener letras y espacios";
    }
  }

  // validaion Razon Social
  if (!input.nameCompany) {
    error.nameCompany =
      "Este campo es obligatorio. Por favor ingrese la Razón social";
  }

  //  validacion documento
  if (!input.n_document) {
    error.n_document = "Este campo es obligatorio. ";
  } else if (!/^[0-9]*$/.test(input.n_document)) {
    error.n_document =
      "Por favor ingrese número valido sin caracteres especiales si es NIT sin digito de verificacion";
  }

  // tipo dociumento

  if (!input.idType) {
    error.idType =
      "Este campo es obligatorio. Por favor seleccione tipo de documento";
  }

  // validacion email
  if (!input.email) {
    error.email =
      "Este campo es obligatorio. Por favor ingrese un correo electronico";
  } else if (
    !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(input.email)
  ) {
    error.email = "El correo no es valido";
  }

  // validacion de password
  if (!input.password) {
    error.password =
      "Este campo es obligatorio. por favor ingrese una contraseña valida.";
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      input.password
    )
  ) {
    error.password =
      "La contraseña debe tener al menos 8 caracteres, al menos una letra minúscula, al menos una letra mayúscula, al menos un número y al menos un carácter especial.";
  }

  // validación teléfono
  if (!input.phone) {
    error.phone =
      "Este campo es obligatorio. Por favor ingrese un número de celular";
  } else if (!/^[0-9]{10}$/.test(input.phone)) {
    error.phone = "Por favor ingrese un número valido";
  }

  // validación ciudad
  if (!input.city_code) {
    error.city_code =
      "Este campo es obligatorio. Por favor ingrese su ciudad de residencia";
  }

  // validación departamento
  if (!input.state_code) {
    error.state_code =
      "Este campo es obligatorio. Por favor ingrese su Departamento de residencia";
  }
  return error;
};

const SignUp = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [submissionResult, setSubmissionResult] = useState(null);

  const [input, setInput] = useState({
    n_document: "",
    idType: "",
    first_name: "",
    last_name: "",
    nameCompany: "",
    commercialName: "",
    person_type: "",
    email: "",
    password: "",
    phone: "",
    city_code: "",
    state_code: "",
    id_role: 1,
  });

  const [error, setError] = useState({
    n_document: "",
    idType: "",
    first_name: "",
    last_name: "",
    nameCompany: "",
    commercialName: "",
    person_type: "",
    email: "",
    password: "",
    phone: "",
    city_code: "",
    state_code: "",
  });

  function handleClick1() {
    history.push("/login");
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
          n_document: "",
          idType: "",
          first_name: "",
          last_name: "",
          nameCompany: "",
          commercialName: "",
          person_type: "",
          email: "",
          password: "",
          phone: "",
          city_code: "",
          state_code: "",
        });
        setValidated(true);
        Swal.fire({
          icon: "success",
          title: "¡Éxito!",
          text: "El registro fue exitoso!.",
        });
        history.push("/login");
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "El registro NO fue exitoso. Verifique documento o correo, el sistema no permite crear un usuario ya registrado con esos datos.",
        });
      }
    } catch (error) {
      console.error("Hubo un error al enviar el formulario:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "El inicio de sesión NO fue exitoso. Verifique email y password.",
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen mt-4 mb-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">Registrate</h1>
      <form
        className="space-y-4"
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Tipo persona</label>
            <select
              required
              name="person_type"
              value={input.person_type}
              onChange={(e) => handleChange(e)}
              className={`border p-2 rounded ${
                error.person_type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Seleccione una opción</option>
              <option value="Person">Persona</option>
              <option value="Company">Empresa</option>
            </select>
          </div>

          {input.person_type === "Person" && (
            <>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Nombres</label>
                <input
                  required
                  type="text"
                  name="first_name"
                  value={input.first_name}
                  placeholder="Nombres"
                  onChange={(e) => handleChange(e)}
                  className={`border p-2 rounded ${
                    error.first_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Apellidos</label>
                <input
                  required
                  type="text"
                  name="last_name"
                  value={input.last_name}
                  placeholder="Apellidos"
                  onChange={(e) => handleChange(e)}
                  className={`border p-2 rounded ${
                    error.last_name ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
            </>
          )}

          {input.person_type === "Company" && (
            <>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Razón Social</label>
                <input
                  required
                  type="text"
                  name="nameCompany"
                  value={input.nameCompany}
                  placeholder="Razón social"
                  onChange={(e) => handleChange(e)}
                  className={`border p-2 rounded ${
                    error.nameCompany ? "border-red-500" : "border-gray-300"
                  }`}
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold">Nombre Comercial</label>{" "}
                (opcional)
                <input
                  type="text"
                  name="commercialName"
                  value={input.commercialName}
                  placeholder="Nombre comercial"
                  onChange={(e) => handleChange(e)}
                  className="border p-2 rounded border-gray-300"
                />
              </div>
            </>
          )}
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Número de Documento</label>
          <input
            required
            type="text"
            name="n_document"
            value={input.n_document}
            placeholder="Número de Documento"
            onChange={(e) => handleChange(e)}
            className={`border p-2 rounded ${
              error.n_document ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Tipo de Documento</label>
          <select
            required
            id="idType"
            name="idType"
            value={input.idType}
            onChange={(e) => handleChange(e)}
            className={`border p-2 rounded ${
              error.idType ? "border-red-500" : "border-gray-300"
            }`}
          >
            {identificationOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Correo Electrónico</label>
          <input
            required
            type="email"
            name="email"
            value={input.email}
            placeholder="Correo Electrónico"
            onChange={(e) => handleChange(e)}
            className={`border p-2 rounded ${
              error.email ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Contraseña</label>
          <input
            required
            type="password"
            name="password"
            value={input.password}
            placeholder="Contraseña"
            onChange={(e) => handleChange(e)}
            className={`border p-2 rounded ${
              error.password ? "border-red-500" : "border-gray-300"
            }`}
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-2 font-semibold">Teléfono</label>
          <input
            type="text"
            name="phone"
            value={input.phone}
            placeholder="Teléfono"
            onChange={(e) => handleChange(e)}
            className="border p-2 rounded border-gray-300"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Código de Ciudad</label>
            <select
              required
              id="city_code"
              name="city_code"
              value={input.city_code}
              onChange={(e) => handleChange(e)}
              className={`border p-2 rounded ${
                error.city_code ? "border-red-500" : "border-gray-300"
              }`}
            >
              {city_codeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col">
            <label className="mb-2 font-semibold">Código de Estado</label>
            <select
              required
              id="state_code"
              name="state_code"
              value={input.state_code}
              onChange={(e) => handleChange(e)}
              className={`border p-2 rounded ${
                error.state_code ? "border-red-500" : "border-gray-300"
              }`}
            >
              {state_codeOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between mt-6">
          <button
            type="submit"
            className="bg-botonVerde text-white py-2 px-4 rounded hover:bg-green-600"
          >
            Crear Cuenta
          </button>
          <button
            type="button"
            onClick={handleClick1}
            className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
          >
            Ya tengo cuenta
          </button>
        </div>
        {submissionResult === "success" && (
          <div className="flex justify-center mt-4">
            <div className="bg-green-100 text-green-800 p-4 rounded">
              Ya eres usuario de Sunya!.
            </div>
          </div>
        )}

        {submissionResult === "error" && (
          <div className="flex justify-center mt-4">
            <div className="bg-red-100 text-red-800 p-4 rounded">
              Algo falló. Inténtelo nuevamente.
            </div>
          </div>
        )}
      </form>
    </div>
    </div>
  );
};

export default SignUp;
