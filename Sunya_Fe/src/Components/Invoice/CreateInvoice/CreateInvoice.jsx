import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  cleanCustomerById,
  cleanCustomersSiigo,
  cleanPaymentsTypeSiigo,
  cleanProductsSiigo,
  cleanTaxes,
  cleanTypeInvoiceSiigo,
  cleanUsers,
  getCustomerById,
  getCustomersSiigo,
  getPaymentsTypeSiigo,
  getProductsSiigo,
  getTaxes,
  getTypeInvoiceSiigo,
  getUsersSiigo,
} from "../../../Redux/ActionsSiigo/actionsSiigo";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";

import { currency } from "../../../Data/Data";
import { BsTrash } from "react-icons/bs";
import CreateCustomerInvoice from "./CreateCustomerInvoice";

const CreateInvoice = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [customerNotFound, setCustomerNotFound] = useState(false);
  
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false);
  const [inactiveCustomerMessage, setInactiveCustomerMessage] = useState("");
  const [disableTypeSelect, setDisableTypeSelect] = useState(false);
  const [priceTotal, setPriceTotal] = useState(0);
  // const customerId = useSelector((state) => state.customerId);
  const users = useSelector((state) => state.usersSiigo);
  const taxes = useSelector((state) => state.taxes);
  const typeInvoices = useSelector((state) => state.typeInvoices);
  const products_siigo = useSelector((state) => state.products_siigo);
  const activeProducts = products_siigo.filter((product) => product.active);
  const customers = useSelector((state) => state.customers);
  const paymentsType = useSelector((state) => state.paymentsType);
  const [input, setInput] = useState({
    id: 0,
    date: new Date(),
    person_type: "",
    id_type: "",
    identification: "",
    check_digit: "",
    name: [],
    commercial_name: "",
    address: "",
    country_code: "",
    state_code: "",
    city_code: "",
    postal_code: "",
    phones: [],
    contacts: [],
    comments: "",
    seller_id: 0,
    collector_id: 0,
    branch_office: 0,
    cost_center: 0,
    currency_code: "",
    seller: 0,
    stamp: false,
    mail: false,
    observations: "",
    items: [],
    payments: [],
  });

  const calculateTotal = (items) => {
    let newTotal = 0;
    items.forEach((item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      const discount = item.discount || 0;
      const taxRate = item.taxes.some((tax) => tax.label === "IVA") ? 0.19 : 0;

      const itemTotal = quantity * price * (1 - discount / 100);
      const itemTotalWithTax = itemTotal * (1 + taxRate);
      newTotal += itemTotalWithTax;
    });
    setPriceTotal(newTotal);
    return newTotal;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (!name) {
      setInput((prevInput) => ({
        ...prevInput,
        name: [""],
      }));
    } else if (name.startsWith("name")) {
      const [, /*fieldName*/ fieldIndex] = name.split("[");
      setInput((prevInput) => ({
        ...prevInput,
        name: [
          ...prevInput.name.slice(0, parseInt(fieldIndex)),
          value,
          ...prevInput.name.slice(parseInt(fieldIndex) + 1),
        ],
      }));
    } else {
      setInput((prevInput) => ({
        ...prevInput,
        [name]: value,
      }));
    }
  };

  const options = customers?.map((customer) => ({
    value: customer.identification,
    label: customer.identification,
  }));

  const optionTaxes = taxes?.map((tax) => ({ value: tax.id, label: tax.type }));

  const handleDateChange = (date) => {
    setInput({ ...input, date });
  };

  const handleChangeIdentification = async (selectedOption) => {
    if (!selectedOption) {
      setCustomerNotFound(true);
      setInactiveCustomerMessage("");
      setShowCreateCustomerForm(false); 
      // Limpiar input cuando no se encuentra el cliente
      setInput((prevInput) => ({
        ...prevInput,
        identification: "",
        name: [],
        phones: [],
        contacts: [],
        person_type: "",
        id_type: "",
        check_digit: "",
        commercial_name: "",
        address: "",
        country_code: "",
        state_code: "",
        city_code: "",
        postal_code: "",
      }));
      return;
    }
  
    const customerMatch = customers?.find(
      (customer) => customer.identification === selectedOption.value
    );
  
    if (!customerMatch) {
      setCustomerNotFound(true);
      setInactiveCustomerMessage(""); 
    } else if (!customerMatch.active) {
      setCustomerNotFound(false);
      setInactiveCustomerMessage(
        "Cliente estado inactivo, por favor actualice el estado del cliente a Activo en Modulo Contable siigo, pestaña Clientes, opción actualizar cliente"
      );
    } else {
      setCustomerNotFound(false);
      setInactiveCustomerMessage(""); 
      setShowCreateCustomerForm(false); 
  
      await dispatch(getCustomerById(customerMatch.id));
  
      setInput((prevInput) => ({
        ...prevInput,
        identification: customerMatch.identification,
        name: customerMatch.name,
        phones: customerMatch.phones,
        contacts: customerMatch.contacts,
        person_type: customerMatch.person_type,
        id_type: customerMatch.id_type,
        check_digit: customerMatch.check_digit,
        commercial_name: customerMatch.commercial_name,
        address: customerMatch.address?.address,
        country_code: customerMatch.address.city.country_code,
        state_code: customerMatch.address.city.state_code,
        city_code: customerMatch.address.city.city_code,
        postal_code: customerMatch.address.postal_code,
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...input.items];
    updatedItems[index][field] = value;

    calculateTotal(updatedItems);

    setInput({
      ...input,
      items: updatedItems,
    });
  };

  const addItem = (event) => {
    event.preventDefault();
    setInput((prevInput) => ({
      ...prevInput,
      items: [
        ...prevInput.items,
        {
          code: "",
          description: "",
          quantity: 1,
          price: 0,
          discount: 0,
          taxes: [],
        },
      ],
    }));
  };

  const removeItem = (index) => {
    const updatedItems = [...input.items];
    updatedItems.splice(index, 1);

    calculateTotal(updatedItems);

    setInput({
      ...input,
      items: updatedItems,
    });
  };

  const handleChangePhone = (index, field, value) => {
    const updatedPhones = [...input.phones];
    updatedPhones[index][field] = value;
    setInput({ ...input, phones: updatedPhones });
  };

  const handleAddPhone = () => {
    setInput({
      ...input,
      phones: [
        ...input.phones,
        {
          indicative: "",
          number: "",
          extension: "",
        },
      ],
    });
  };

  const handleRemovePhone = (index) => {
    const updatedPhones = [...input.phones];
    updatedPhones.splice(index, 1);
    setInput({ ...input, phones: updatedPhones });
  };

  const handleChangeContact = (index, field, value) => {
    const updatedContacts = [...input.contacts];
    if (field.includes("phone.")) {
      const phoneField = field.split(".")[1];
      updatedContacts[index].phone[phoneField] = value;
    } else {
      updatedContacts[index][field] = value;
    }
    setInput({ ...input, contacts: updatedContacts });
  };

  const handleAddContact = () => {
    setInput({
      ...input,
      contacts: [
        ...input.contacts,
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
  };

  const handleRemoveContact = (index) => {
    const updatedContacts = [...input.contacts];
    updatedContacts.splice(index, 1);
    setInput({ ...input, contacts: updatedContacts });
  };

  const handleChangePayment = (field, value) => {
    const updatedPayments = [...input.payments];
    const paymentIndex = updatedPayments.findIndex(
      (payment) => payment.id === value.id
    );

    if (paymentIndex >= 0) {
      updatedPayments[paymentIndex] = {
        ...updatedPayments[paymentIndex],
        [field]: value[field],
      };
    } else {
      const newPayment = {
        id: "",
        value: priceTotal,
        due_date: "",
        ...value,
      };
      updatedPayments.push(newPayment);
    }

    setInput((prevState) => ({
      ...prevState,
      payments: updatedPayments,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setDisableTypeSelect(false);
    console.log(JSON.stringify(input, null, 2));

    // try {
    //   const response = await dispatch(createCustomerSiigo(input));
    //   console.log(response);
    //   if (response.success) {
    //     Swal.fire({
    //       icon: 'success',
    //       title: '¡Éxito!',
    //       text: 'El cliente ha sido creado exitosamente.',
    //     });
    //     setInput({});
    //     setTimeout(() => {
    //       history.push('/admin/dashboard');
    //     }, 2000);
    //   } else {
    //     Swal.fire({
    //       icon: 'error',
    //       title: 'Error',
    //       text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
    //     });
    //   }
    // } catch (error) {
    //   console.error('Hubo un error al enviar el formulario:', error);
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Error',
    //     text: 'Hubo un error al procesar tu solicitud. Por favor, inténtalo de nuevo más tarde.',
    //   });
    // }
  };

  useEffect(() => {
    dispatch(getCustomersSiigo(/*{ headers }*/));
    dispatch(getUsersSiigo(/*headers*/));
    dispatch(getTypeInvoiceSiigo(/*headers*/));
    dispatch(getTaxes(/*headers*/));
    dispatch(getProductsSiigo(/*headers*/));
    dispatch(getPaymentsTypeSiigo(/*headers*/));
    return () => {
      dispatch(cleanTypeInvoiceSiigo());
      dispatch(cleanCustomersSiigo());
      dispatch(cleanCustomerById());
      dispatch(cleanUsers());
      dispatch(cleanTaxes());
      dispatch(cleanProductsSiigo());
      dispatch(cleanPaymentsTypeSiigo());
    };
  }, [dispatch]);

  return (
    <div className="p-5 bg-white rounded-lg shadow-md">
      <div>
        <h2 className="py-8 text-center bg-botonVerde tx-xl text-white justify-center mb-12">
         FACTURA SIIGO
        </h2>
        <div className="line_text"></div>
      </div>
      <form
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 font-normal mb-1">
            Tipo de Comprobante
          </label>
          <select
            name="id"
            value={input.id}
            onChange={handleChange}
            className="block w-full p-2 border border-gray-300 rounded-md"
            disabled={disableTypeSelect}
          >
            <option value="">Selecciona una opción</option>
            {typeInvoices?.map((typeInvoice) => (
              <option key={typeInvoice.id} value={typeInvoice.id}>
                {typeInvoice.type}-{typeInvoice.name}-
                {typeInvoice.electronic_type}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-normal mb-1">
            Fecha 
          </label>
          <DatePicker
            selected={input.date}
            onChange={handleDateChange}
            dateFormat="yyyy-MM-dd"
            minDate={new Date()}
            className="block w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="customerSelect"
            className="block text-gray-700 font-normal mb-1"
          >
          Documento
          </label>
          <Select
            id="customerSelect"
            options={options}
            value={{
              value: input.identification,
              label: input.identification,
            }}
            onChange={handleChangeIdentification}
            isSearchable
            className="w-full"
            onInputChange={(inputValue, { action }) => {
              if (action === "input-change" && !options.value) {
                handleChangeIdentification({ value: inputValue });
              }
            }}
          />
        </div>

        {inactiveCustomerMessage && (
          <div className="mb-4">
            <p>{inactiveCustomerMessage}</p>
          </div>
        )}

        {customerNotFound && (
          <div className="mb-4 col-span-2">
            <label
              htmlFor="createCustomerCheckbox"
              className="block text-gray-700 font-normal mb-1"
            >
             Cliente no existe en Siigo 
            </label>
            <div className="text-sm text-gray-600">
              Para continuar por favor seleccione la opción{" "}
              <span className="font-bold">SI </span>, para crearlo
              con la factura 
            </div>
            <div className="mt-2">
              <input
                type="checkbox"
                id="createCustomerCheckbox"
                name="createCustomer"
                checked={showCreateCustomerForm}
                onChange={() =>
                  setShowCreateCustomerForm((prevState) => !prevState)
                }
                className="form-check-input"
              />
              <label
                htmlFor="createCustomerCheckbox"
                className="ml-2 text-gray-700 font-normal"
              >
                {showCreateCustomerForm ? "Crear cliente con factura" : "Si"}
              </label>
            </div>
          </div>
        )}

        {showCreateCustomerForm && (
          <CreateCustomerInvoice
            input={input}
            handleChange={handleChange}
            handleAddPhone={handleAddPhone}
            handleChangePhone={handleChangePhone}
            handleRemovePhone={handleRemovePhone}
            handleChangeContact={handleChangeContact}
            handleAddContact={handleAddContact}
            handleRemoveContact={handleRemoveContact}
          />
        )}

        <div className="mb-4">
          <label className="block text-gray-700 font-normal mb-1">
              Vendedor
          </label>
          <select
            name="seller"
            value={input.seller}
            onChange={(e) => handleChange(e)}
            className="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option value="">Selecciona una opción</option>
            {users?.map((user) => (
              <option key={user.id} value={user.id}>
                {user.first_name} - {user.identification}
              </option>
            ))}
          </select>
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label className="form-label">
            <strong className="strong_create">
              Envio factura electronica a la DIAN ?
            </strong>
          </label>
          <select
            name="stamp"
            value={input.stamp}
            onChange={(e) => handleChange(e)}
            className="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label className="form-label">
            <strong className="strong_create">
              Envio por email?
            </strong>
          </label>
          <select
            name="mail"
            value={input.mail}
            onChange={(e) => handleChange(e)}
            className="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option value="">Selecciona una opción</option>
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label className="form-label">
            <strong className="strong_create">Centro de costo</strong>
          </label>
          <input
            type="number"
            name="cost_center"
            value={input.cost_center}
            onChange={(e) => handleChange(e)}
            className="form-control"
            id="exampleFormControlInput1"
          />
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label className="form-label">
            <strong className="strong_create">Moneda</strong>
          </label>
          <select
            name="currency_code"
            value={input.currency_code}
            onChange={(e) => handleChange(e)}
            className="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option value="">Selecciona una opción</option>
            {currency.map((data, index) => (
              <option key={index} value={data.value}>
                {data.label}
              </option>
            ))}
          </select>
        </div>

        <div className="col-12" style={{ marginBottom: "20px" }}>
          {" "}
          <button className="btn btn-outline-light" onClick={addItem}>
            AGREGAR PRODUCTO
          </button>
        </div>

        <div className="container">
          {input.items?.map((item, index) => (
            <div key={index} className="card mb-1">
              <div className="card-body">
                <div className="row align-items-center">
                  <div className="col-md-2">
                    <label
                      htmlFor={`codigoProducto_${index}`}
                      className="form-label"
                    >
                      <strong className="strong_create">Código producto</strong>
                    </label>
                    <Select
                      id={`codigoProducto_${index}`}
                      value={{ value: item.code, label: item.code }}
                      onChange={(selectedOption) => {
                        handleItemChange(index, "code", selectedOption.value);
                        const selectedProduct = activeProducts.find(
                          (product) => product.code === selectedOption.value
                        );
                        handleItemChange(
                          index,
                          "description",
                          selectedProduct.description
                        );
                        handleItemChange(
                          index,
                          "reference",
                          selectedProduct.reference
                        );
                        handleItemChange(
                          index,
                          "price",
                          selectedProduct.prices[0].price_list[0].value
                        );
                      }}
                      options={activeProducts.map((product) => ({
                        value: product.code,
                        label: product.code,
                      }))}
                    />
                  </div>
                  <div className="col-md-4">
                    <label
                      htmlFor={`descripcionProducto_${index}`}
                      className="form-label"
                    >
                      <strong className="strong_create">Descripción</strong>
                    </label>
                    <input
                      type="text"
                      id={`descripcionProducto_${index}`}
                      className="form-control form-control-lg"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-1">
                    <label htmlFor={`quantity_${index}`} className="form-label">
                      <strong className="strong_create">Cantidad</strong>
                    </label>
                    <input
                      type="number"
                      id={`quantity_${index}`}
                      className="form-control"
                      value={item.quantity}
                      onChange={(e) => {
                        let value = parseInt(e.target.value, 10);
                        if (isNaN(value) || value < 1) {
                          value = 1;
                        }
                        handleItemChange(index, "quantity", value);
                      }}
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor={`discount_${index}`} className="form-label">
                      <strong className="strong_create">Descuento %</strong>
                    </label>
                    <input
                      type="number"
                      id={`discount_${index}`}
                      className="form-control"
                      value={item.discount}
                      onChange={(e) =>
                        handleItemChange(index, "discount", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-2">
                    <label htmlFor={`price_${index}`} className="form-label">
                      <strong className="strong_create">
                        Valor unitario $
                      </strong>
                    </label>
                    <input
                      type="number"
                      id={`price_${index}`}
                      className="form-control"
                      value={item.price}
                      onChange={(e) =>
                        handleItemChange(index, "price", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-md-4">
                    <label htmlFor={`taxes_${index}`} className="form-label">
                      <strong className="strong_create">Impuestos</strong>
                    </label>
                    <Select
                      isMulti
                      id={`taxes_${index}`}
                      options={optionTaxes}
                      onChange={(selectedOptions) => {
                        // Asegúrate de que `selectedOptions` se convierte correctamente
                        handleItemChange(
                          index,
                          "taxes",
                          selectedOptions.map((option) => ({
                            id: option.value,
                            label: option.label,
                          }))
                        );
                      }}
                      value={item.taxes.map((tax) => ({
                        value: tax.id,
                        label: tax.label,
                      }))}
                    />
                  </div>
                  <div className="col-md-1 d-flex align-items-center justify-content-center">
                    <BsTrash
                      title="Eliminar producto"
                      onClick={() => removeItem(index)}
                      style={{
                        cursor: "pointer",
                        fontSize: "1.3rem",
                        color: "red",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label htmlFor="payments_id" className="form-label">
            <strong className="strong_create">Metodo de pago</strong>
          </label>
          <select
            id="payments_id"
            onChange={(e) =>
              handleChangePayment("id", { id: parseInt(e.target.value) })
            }
            className="form-select form-select-sm"
            aria-label="Small select example"
          >
            <option value="">Selecciona una opción</option>
            {paymentsType?.map((payment) => (
              <option key={payment.id} value={payment.id}>
                {payment.name}
              </option>
            ))}
          </select>
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label htmlFor="payments_value" className="form-label">
            <strong className="strong_create">
              Valor pago total factura $
            </strong>
          </label>
          <input
            type="number"
            id="payments_value"
            step="0.01"
            value={priceTotal.toFixed(2)}
            readOnly
            className="form-control"
          />
        </div>

        <div className="row">
          <div
            className="col-md-8 d-flex align-items-center"
            style={{ marginBottom: "20px" }}
          >
            <label className="form-label">
              <strong className="strong_create">Fecha de pago</strong>
            </label>
            <DatePicker
              id="payment_due_date"
              selected={
                input.payments.length &&
                input.payments[input.payments.length - 1].due_date
                  ? new Date(input.payments[input.payments.length - 1].due_date)
                  : null
              }
              onChange={(date) =>
                handleChangePayment("due_date", {
                  id: input.payments.length
                    ? input.payments[input.payments.length - 1].id
                    : 0,
                  due_date: date, // Formatear la fecha a 'yyyy-MM-dd'
                })
              }
              dateFormat="yyyy-MM-dd"
              className="form-control"
            />
          </div>
        </div>

        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: "20px" }}
        >
          <label className="form-label">
            <strong className="strong_create">Observaciones factura</strong>
          </label>
          <textarea
            className="form-control"
            name="observations"
            value={input.observations}
            onChange={(e) => handleChange(e)}
            rows="3"
          ></textarea>
        </div>

        <div className="col-span-2 text-center mt-6">
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        AGREGAR PRODUCTO
      </button>
    </div>
  </form>
</div>
  );
};

export default CreateInvoice;
