/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import {
  person_type,
  identificationOptions,
  check_digitOptions,
  fiscal_responsibilitiesOptions,
  state_codeOptions,
  city_codeOptions,
  Indicativo_Options,
  Contact_Indicativo_Options,
} from "../../../Data/options";

const CreateCustomerInvoice = ({
  input,
  handleChange,
  handleAddPhone,
  handleRemovePhone,
  handleChangePhone,
  handleChangeContact,
  handleRemoveContact,
  handleAddContact,
}) => {
  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div className="w-full md:w-1/2 mb-5">
        <label htmlFor="person_type" className="form-label font-bold mb-1 block">
          Tipo de persona
        </label>
        <select
          name="person_type"
          value={input.person_type}
          onChange={handleChange}
          className="form-select form-select-sm border-gray-300 rounded w-full"
          required
        >
          <option value="">Selecciona una opción</option>
          {person_type.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/2 mb-5">
        <label htmlFor="id_type" className="form-label font-bold mb-1 block">
          Tipo de documento
        </label>
        <select
          name="id_type"
          value={input.id_type}
          onChange={handleChange}
          className="form-select form-select-sm border-gray-300 rounded w-full"
          required
        >
          <option value="">Selecciona una opción</option>
          {identificationOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/2 mb-5">
        <label className="form-label font-bold mb-1 block">
          Identificación
        </label>
        <input
          type="text"
          name="identification"
          value={input.identification}
          onChange={handleChange}
          className="form-control form-control-sm border-gray-300 rounded w-full"
          required
        />
      </div>

      {input.id_type === '31' && (
        <div className="w-full md:w-1/2 mb-5">
          <label htmlFor="check_digit" className="form-label font-bold mb-1 block">
            Digito de verificación
          </label>
          <select
            name="check_digit"
            value={input.check_digit}
            onChange={handleChange}
            className="form-select form-select-sm border-gray-300 rounded w-full"
          >
            <option value="">Selecciona una opción</option>
            {check_digitOptions.map((digit) => (
              <option key={digit} value={digit}>
                {digit}
              </option>
            ))}
          </select>
        </div>
      )}

      {input.person_type === 'Company' && (
        <>
          <div className="w-full md:w-1/2 mb-5">
            <label className="form-label font-bold mb-1 block">
              Razon Social
            </label>
            <input
              type="text"
              name="name[0]"
              value={input.name[0]}
              onChange={handleChange}
              className="form-control border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="w-full md:w-1/2 mb-5">
            <label className="form-label font-bold mb-1 block">
              Nombre Comercial
            </label>
            <input
              type="text"
              name="commercial_name"
              value={input.commercial_name}
              onChange={handleChange}
              className="form-control border-gray-300 rounded w-full"
            />
          </div>
        </>
      )}

      {input.person_type === 'Person' && (
        <>
          <div className="w-full md:w-1/2 mb-5">
            <label className="form-label font-bold mb-1 block">
              Nombre
            </label>
            <input
              type="text"
              name="name[0]"
              value={input.name[0]}
              onChange={handleChange}
              className="form-control border-gray-300 rounded w-full"
              required
            />
          </div>
          <div className="w-full md:w-1/2 mb-5">
            <label className="form-label font-bold mb-1 block">
              Apellido
            </label>
            <input
              type="text"
              name="name[1]"
              value={input.name[1]}
              onChange={handleChange}
              className="form-control border-gray-300 rounded w-full"
              required
            />
          </div>
        </>
      )}

      <div className="w-full md:w-1/2 mb-5">
        <label className="form-label font-bold mb-1 block">
          Dirección 
        </label>
        <input
          type="text"
          name="address"
          value={input.address}
          onChange={handleChange}
          className="form-control border-gray-300 rounded w-full"
          required
        />
      </div>

      <div className="w-full md:w-1/2 mb-5">
        <label className="form-label font-bold mb-1 block">
          País
        </label>
        <input
          type="text"
          name="country_code"
          value="Colombia"
          readOnly
          className="form-input form-input-sm border-gray-300 rounded w-full"
        />
      </div>

      <div className="w-full md:w-1/2 mb-5">
        <label className="form-label font-bold mb-1 block">
          Departamento
        </label>
        <select
          name="state_code"
          value={input.state_code}
          onChange={handleChange}
          className="form-select form-select-sm border-gray-300 rounded w-full"
          required
        >
          <option value="">Selecciona una opción</option>
          {state_codeOptions.map((state) => (
            <option key={state.code} value={state.code}>
              {state.label}
            </option>
          ))}
        </select>
      </div>

      <div className="w-full md:w-1/2 mb-5">
        <label className="form-label font-bold mb-1 block">
          Ciudad
        </label>
        <select
          name="city_code"
          value={input.city_code}
          onChange={handleChange}
          className="form-select form-select-sm border-gray-300 rounded w-full"
          required
        >
          <option value="">Selecciona una opción</option>
          {city_codeOptions.map((city) => (
            <option key={city.code} value={city.code}>
              {city.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CreateCustomerInvoice;


