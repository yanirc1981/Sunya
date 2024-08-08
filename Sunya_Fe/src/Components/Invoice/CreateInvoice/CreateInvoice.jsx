import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link /*useHistory*/ } from 'react-router-dom';
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
} from '../../../Redux/ActionsSiigo/actionsSiigo';
import { FaArrowAltCircleLeft } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Select from 'react-select';
import './createinvoice.css';
import { currency } from '../../../Data/Data';
import { BsTrash } from 'react-icons/bs';
import CreateCustomerInvoice from './CreateCustomerInvoice';

const CreateInvoice = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const [customerNotFound, setCustomerNotFound] = useState(false);
  const [showCreateCustomerForm, setShowCreateCustomerForm] = useState(false);
  const [inactiveCustomerMessage, setInactiveCustomerMessage] = useState('');
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
    person_type: '',
    id_type: '',
    identification: '',
    check_digit: '',
    name: [],
    commercial_name: '',
    address: '',
    country_code: '',
    state_code: '',
    city_code: '',
    postal_code: '',
    phones: [],
    contacts: [],
    comments: '',
    seller_id: 0,
    collector_id: 0,
    branch_office: 0,
    cost_center: 0,
    currency_code: '',
    seller: 0,
    stamp: false,
    mail: false,
    observations: '',
    items: [],
    payments: [],
  });

  const calculateTotal = (items) => {
    let newTotal = 0;
    items.forEach((item) => {
      const quantity = item.quantity || 0;
      const price = item.price || 0;
      const discount = item.discount || 0;
      const taxRate = item.taxes.some((tax) => tax.label === 'IVA') ? 0.19 : 0;

      const itemTotal = quantity * price * (1 - discount / 100);
      const itemTotalWithTax = itemTotal * (1 + taxRate);
      newTotal += itemTotalWithTax;
    });
    setPriceTotal(newTotal);
    return newTotal;
  };

  const handleChange = (e) => {
    // Si la función se llama desde otros inputs
    const { name, value } = e.target;
    if (!name) {
      setInput((prevInput) => ({
        ...prevInput,
        name: [''],
      }));
    } else if (name.startsWith('name')) {
      const [, /*fieldName*/ fieldIndex] = name.split('[');
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
    const customerMatch = customers?.find(
      (customer) => customer.identification === selectedOption.value
    );

    if (!selectedOption) {
      // Si no hay ninguna opción seleccionada
      setCustomerNotFound(true);
      setInactiveCustomerMessage('');
      setShowCreateCustomerForm(false); // Oculta el checkbox
    } else if (!customerMatch) {
      // Si no hay ningún cliente que coincida con el número ingresado manualmente
      setCustomerNotFound(true);
      setInactiveCustomerMessage(''); // Reinicia el mensaje de cliente inactivo
    } else if (!customerMatch.active) {
      // Si el cliente está inactivo
      setCustomerNotFound(false);
      setInactiveCustomerMessage(
        'Cliente estado inactivo, por favor actualice el estado del cliente a Activo en Modulo Contable siigo, pestaña Clientes, opcion actualizar cliente'
      );
    } else {
      // Si el cliente está activo

      setCustomerNotFound(false);
      setInactiveCustomerMessage(''); // Reinicia el mensaje de cliente inactivo
      setShowCreateCustomerForm(false); // Oculta el checkbox

      await dispatch(getCustomerById(customerMatch.id /*headers*/));
    }

    setInput((prevInput) => ({
      ...prevInput,
      identification: selectedOption.value,
      name: customerMatch?.name,
      phones: customerMatch?.phones,
      contacts: customerMatch?.contacts,
      person_type: customerMatch?.person_type,
      id_type: customerMatch?.id_type,
      check_digit: customerMatch?.check_digit,
      commercial_name: customerMatch?.commercial_name,
      address: customerMatch?.address.address,
      country_code: customerMatch.address.city.country_code,
      state_code: customerMatch.address.city.state_code,
      city_code: customerMatch.address.city.city_code,
      postal_code: customerMatch.address.postal_code,
    }));
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
          code: '',
          description: '',
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
          indicative: '',
          number: '',
          extension: '',
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
    if (field.includes('phone.')) {
      const phoneField = field.split('.')[1];
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
          first_name: '',
          last_name: '',
          email: '',
          phone: {
            indicative: '',
            number: '',
            extension: '',
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
        id: '',
        value: priceTotal,
        due_date: '',
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
    <div>
      <Link
        to="/admin/dashboard"
        className="container link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover text-black"
      >
        <FaArrowAltCircleLeft /> Regresar a tablero dashboard administrador
      </Link>{' '}
      <div className="container border border-info rounded bg-secondary mt-3 mb-3">
        <div>
          <h2 className="text-center text-light">
            Formulario creación factura Siigo nube
          </h2>
          <div className="line_text"></div>
        </div>
        <form className="row" onSubmit={handleSubmit}>
          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">Tipo de comprobante</strong>
            </label>
            <select
              name="id"
              value={input.id}
              onChange={(e) => handleChange(e)}
              className="form-select form-select-sm"
              aria-label="Small select example"
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

          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">Fecha de la factura</strong>
            </label>
            <DatePicker
              selected={input.date}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
              minDate={new Date()}
            />
          </div>

          <div
            className="col-md-3 d-flex flex-column"
            style={{ marginBottom: '20px' }}
          >
            <label htmlFor="customerSelect" className="form-label">
              <strong className="strong_create">
                # Identificación cliente
              </strong>
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
              onInputChange={(inputValue, { action }) => {
                if (action === 'input-change' && !options.value) {
                  handleChangeIdentification({ value: inputValue });
                }
              }}
            />
          </div>
          <div
            className="col-md-2 d-flex flex-column"
            style={{ marginBottom: '20px' }}
          >
            {inactiveCustomerMessage && <p>{inactiveCustomerMessage}</p>}
          </div>
          {customerNotFound && (
            <div
              className="col-md-6 d-flex flex-column"
              style={{ marginBottom: '20px' }}
            >
              <label htmlFor="createCustomerCheckbox">
                **Cliente no está creado en Siigo Nube.***
              </label>
              <div className="div_p_invoice">
                <p>
                  Para continuar por favor seleccione la opción{' '}
                  <strong>SI en el checkbox,</strong>para crearlo con la factura
                  ó cree el cliente en el modulo contable siigo pestaña
                  Clientes, opción crear cliente
                </p>
              </div>
              <div
                className="col-md-6 d-flex flex-column"
                style={{ marginBottom: '20px' }}
              >
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
                <label className="form-check-label">
                  {showCreateCustomerForm ? 'Crear cliente con factura' : 'Si'}
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

          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">
                Vendedor asociado a la factura
              </strong>
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
            style={{ marginBottom: '20px' }}
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
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">
                Envio factura correo electronico al CLIENTE ?
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
            style={{ marginBottom: '20px' }}
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
            style={{ marginBottom: '20px' }}
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

          <div className="col-12" style={{ marginBottom: '20px' }}>
            {' '}
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
                        <strong className="strong_create">
                          Código producto
                        </strong>
                      </label>
                      <Select
                        id={`codigoProducto_${index}`}
                        value={{ value: item.code, label: item.code }}
                        onChange={(selectedOption) => {
                          handleItemChange(index, 'code', selectedOption.value);
                          const selectedProduct = activeProducts.find(
                            (product) => product.code === selectedOption.value
                          );
                          handleItemChange(
                            index,
                            'description',
                            selectedProduct.description
                          );
                          handleItemChange(
                            index,
                            'reference',
                            selectedProduct.reference
                          );
                          handleItemChange(
                            index,
                            'price',
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
                          handleItemChange(index, 'description', e.target.value)
                        }
                      />
                    </div>
                    <div className="col-md-1">
                      <label
                        htmlFor={`quantity_${index}`}
                        className="form-label"
                      >
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
                          handleItemChange(index, 'quantity', value);
                        }}
                      />
                    </div>
                    <div className="col-md-2">
                      <label
                        htmlFor={`discount_${index}`}
                        className="form-label"
                      >
                        <strong className="strong_create">Descuento %</strong>
                      </label>
                      <input
                        type="number"
                        id={`discount_${index}`}
                        className="form-control"
                        value={item.discount}
                        onChange={(e) =>
                          handleItemChange(index, 'discount', e.target.value)
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
                          handleItemChange(index, 'price', e.target.value)
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
                            'taxes',
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
                          cursor: 'pointer',
                          fontSize: '1.3rem',
                          color: 'red',
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
            style={{ marginBottom: '20px' }}
          >
            <label htmlFor="payments_id" className="form-label">
              <strong className="strong_create">Metodo de pago</strong>
            </label>
            <select
              id="payments_id"
              onChange={(e) =>
                handleChangePayment('id', { id: parseInt(e.target.value) })
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
            style={{ marginBottom: '20px' }}
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
              style={{ marginBottom: '20px' }}
            >
              <label className="form-label">
                <strong className="strong_create">Fecha de pago</strong>
              </label>
              <DatePicker
                id="payment_due_date"
                selected={
                  input.payments.length &&
                  input.payments[input.payments.length - 1].due_date
                    ? new Date(
                        input.payments[input.payments.length - 1].due_date
                      )
                    : null
                }
                onChange={(date) =>
                  handleChangePayment('due_date', {
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
            style={{ marginBottom: '20px' }}
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

          <div className="col-12" style={{ marginBottom: '20px' }}>
            <button type="submit" className="btn btn-outline-light">
              Crear Factura
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateInvoice;
