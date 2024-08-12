import { useState } from "react";
import { useDispatch } from "react-redux";

import { createCustomerSiigo } from "../../Redux/ActionsSiigo/actionsSiigo";
import './customerdata.css';
import CheckoutSteps from "../CheckoutSteps/CheckoutSteps";
import {
  identificationOptions,
  check_digitOptions,
  fiscal_responsibilitiesOptions,
  state_codeOptions,
  city_codeOptions,
  Indicativo_Options,
  Contact_Indicativo_Options,
} from "../../Data/options";

export default function CustomerData() {
 
 
  const [formData, setFormData] = useState({
    person_type: "",
    identification: "",
    check_digit: "",
    commercial_name: "",
    address: {
      address: "",
      country_code: "Co",
      state_code: "",
      city_code: "",
      postal_code: "",
    },
    indicative: "",
    number: "",
    extension: "",
    email: "",
    comments: "",
    seller_id: "",
    collector_id: "",
    fiscal_responsibilities: "",
    contacts: [
      {
        first_name: "",
        last_name: "",
        email: "",
        phone: {
          indicative: "",
          number: "",
          extension: "",
        },
      },
    ],
  });

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [personType, setPersonType] = useState("");
  const [idType, setIdType] = useState("");
  const [showCheckDigit, setShowCheckDigit] = useState(false);
  
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [field, subfield] = name.split(".");

    if (subfield) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: {
          ...prevData[field],
          [subfield]: value,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleContactChange = (e, index) => {
    const { name, value } = e.target;
    const [fieldName] = name.split(".").slice(1); // Descartamos "contacts[0]" y obtenemos solo el nombre del campo
    setFormData((prevData) => {
      const updatedContacts = prevData.contacts.map((contact, i) =>
        i === index ? { ...contact, [fieldName]: value } : contact
      );
      return { ...prevData, contacts: updatedContacts };
    });
  };

  const handlePersonTypeChange = (e) => {
    const value = e.target.value;
    setPersonType(value);
    setFormData((prevData) => ({
      ...prevData,
      person_type: value,
    }));
  };

  const handleIdTypeChange = (e) => {
    const value = e.target.value;
    setIdType(value);
    setFormData((prevData) => ({
      ...prevData,
      id_type: value,
    }));
    setShowCheckDigit(value === "31");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      type: formData.type,
      person_type: formData.person_type,
      id_type: idType,
      identification: formData.identification,
      check_digit: formData.check_digit || "",
      name:
        personType === "Company"
          ? formData.commercial_name
          : `${firstName} ${lastName}`,
      commercial_name: personType === "Company" ? formData.commercial_name : "",
      branch_office: 0,
      active: true,
      vat_responsible: false,
      fiscal_responsibilities: [formData.fiscal_responsibilities],
      address: {
        address: formData.address,
        city: {
          country_code: formData.country_code,
          state_code: formData.state_code,
          city_code: formData.city_code,
        },
        postal_code: formData.postal_code,
      },
      phones: [
        {
          indicative: formData.indicative,
          number: formData.number,
          extension: formData.extension || "",
        },
      ],
      contacts: [
        {
          first_name: formData.first_name || firstName,
          last_name: formData.last_name || lastName,
          email: formData.email,
          phone: {
            indicative: formData.indicative,
            number: formData.number,
            extension: formData.extension || "",
          },
        },
      ],
      comments: formData.comments,
      related_users: {
        seller_id: formData.seller_id,
        collector_id: formData.collector_id,
      },
    };

    console.log("Datos a enviar:", JSON.stringify(payload, null, 2));
    const response = await dispatch(createCustomerSiigo(payload));

    if (response.success) {
      alert("Cliente creado correctamente");
    } else {
      alert(`Error al crear el cliente: ${response.errorMessage}`);
    }
  };

  return (
<div className="container-shipping">
<CheckoutSteps step1 step2 />
      <div className="w-full h-full bg-white p-8 rounded-lg shadow-md flex flex-grow items-center justify-center mb-16 mt-32">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-grow flex-col space-y-8"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold mb-6">
              Completa todos los campos para crear un nuevo Cliente en Siigo{" "}
            </h2>
           
          </div>

          <div className="border-b border-gray-900/10 pb-8">
            <div className="grid ml-4 grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-10">
              <div className="sm:col-span-3">
                <label
                  htmlFor="person_type"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Person Type
                </label>
                <div className="mt-2">
                  <select
                    id="person_type"
                    name="person_type"
                    value={personType}
                    onChange={handlePersonTypeChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Select...</option>
                    <option value="Person">Persona</option>
                    <option value="Company">Compañía</option>
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="id_type"
                  className="block text-sm font-medium leading-6 text-gray-900 capitalize"
                >
                  Tipo de Identificación
                </label>
                <div className="mt-2">
                  <select
                    id="id_type"
                    name="id_type"
                    value={idType}
                    onChange={handleIdTypeChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {identificationOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="identification"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Numero Documento
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="identification"
                    name="identification"
                    value={formData.identification}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              {showCheckDigit && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="check_digit"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Check Digit
                  </label>
                  <div className="mt-2">
                    <select
                      id="check_digit"
                      name="check_digit"
                      value={formData.check_digit}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    >
                      {check_digitOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {personType === "Person" && (
                <>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Nombre
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="first_name"
                        name="first_name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Apellido
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        id="last_name"
                        name="last_name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </>
              )}

              {personType === "Company" && (
                <div className="sm:col-span-3">
                  <label
                    htmlFor="commercial_name"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nombre Comercial
                  </label>
                  <div className="mt-2">
                    <input
                      type="text"
                      id="commercial_name"
                      name="commercial_name"
                      value={formData.commercial_name}
                      onChange={handleChange}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              )}

              <div className="sm:col-span-3">
                <label
                  htmlFor="fiscal_responsibilities"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Responsabilidades Fiscales
                </label>
                <div className="mt-2">
                  <select
                    id="fiscal_responsibilities"
                    name="fiscal_responsibilities"
                    value={formData.fiscal_responsibilities}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {fiscal_responsibilitiesOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address.address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Dirección
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="address.address"
                    name="address.address"
                    value={formData.address.address}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address.state_code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Código de Estado
                </label>
                <div className="mt-2">
                  <select
                    id="address.state_code"
                    name="address.state_code"
                    value={formData.address.state_code}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {state_codeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address.city_code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Código de Ciudad
                </label>
                <div className="mt-2">
                  <select
                    id="address.city_code"
                    name="address.city_code"
                    value={formData.address.city_code}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {city_codeOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="address.postal_code"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Código Postal
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="address.postal_code"
                    name="address.postal_code"
                    value={formData.address.postal_code}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="indicative"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Indicativo
                </label>
                <div className="mt-2">
                  <select
                    id="indicative"
                    name="indicative"
                    value={formData.indicative}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {Indicativo_Options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Número de Teléfono
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    min="1000000000"
                    max="9999999999"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="extension"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Extensión
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="extension"
                    name="extension"
                    value={formData.extension}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Correo Electrónico
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="contacts[0].first_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Nombre del Contacto
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="contacts[0].first_name"
                    name="contacts[0].first_name"
                    value={formData.contacts[0].first_name}
                    onChange={(e) => handleContactChange(e, 0)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="contacts[0].last_name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Apellido del Contacto
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="contacts[0].last_name"
                    name="contacts[0].last_name"
                    value={formData.contacts[0].last_name}
                    onChange={(e) => handleContactChange(e, 0)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="contacts[0].email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email del Contacto
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    id="contacts[0].email"
                    name="contacts[0].email"
                    value={formData.contacts[0].email}
                    onChange={(e) => handleContactChange(e, 0)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="indicative"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Indicativo del Telefono de contacto
                </label>
                <div className="mt-2">
                  <select
                    id="contacts[0].indicative"
                    name="contacts.0.indicative"
                    value={formData.contacts[0].indicative}
                    onChange={(e) => handleContactChange(e, 0)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    {Contact_Indicativo_Options.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="contacts[0].number"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Teléfono del Contacto
                </label>
                <div className="mt-2">
                  <input
                    type="number"
                    id="contacts[0].number"
                    name="contacts.0.number"
                    value={formData.contacts[0].number}
                    onChange={(e) => handleContactChange(e, 0)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="comments"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Comentarios
                </label>
                <div className="mt-2">
                  <textarea
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="seller_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ID del Vendedor
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="seller_id"
                    name="seller_id"
                    value={formData.seller_id}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="collector_id"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  ID del Recaudador
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="collector_id"
                    name="collector_id"
                    value={formData.collector_id}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-orange-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
            >
              Crear Cliente
            </button>
          </div>
        </form>
      </div>
      </div>
   
  );
}



