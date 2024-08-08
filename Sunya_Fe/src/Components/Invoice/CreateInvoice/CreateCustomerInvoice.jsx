import React from 'react';

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
    <>
     
      <div
        className="col-md-6 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label htmlFor="inputState" className="form-label">
          <strong className="strong_create">Tipo de persona</strong>*
        </label>
        <select
          name="person_type"
          value={input.person_type}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Person">Persona</option>
          <option value="Company">Empresa</option>
        </select>
      </div>
      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label htmlFor="inputState" className="form-label">
          <strong className="strong_create">Tipo de documento</strong>*
        </label>
        <select
          name="id_type"
          value={input.id_type}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
          style={{ overflowWrap: 'break-word' }}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="13">Cédula de ciudadanía</option>
          <option value="31">NIT</option>
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
        </select>
      </div>

      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create"># Identificación</strong>*
        </label>
        <input
          type="text"
          name="identification"
          value={input.identification}
          onChange={(e) => handleChange(e)}
          className="form-control form-control-sm"
          required
        />
      </div>

      {input.id_type === '31' && (
        <div
          className="col-md-5 d-flex align-items-center"
          style={{ marginBottom: '20px' }}
        >
          <label htmlFor="inputState" className="form-label">
            <strong className="strong_create">Digito de verificación</strong>
          </label>
          <select
            name="check_digit"
            value={input.check_digit}
            onChange={(e) => handleChange(e)}
            className="form-select form-select-sm"
            aria-label="Small select example"
            style={{ overflowWrap: 'break-word' }}
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
          </select>
        </div>
      )}

      {input.person_type === 'Company' && (
        <>
          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">Razon Social</strong>*
            </label>
            <input
              type="text"
              name="name[0]"
              value={input.name[0]}
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
            />
          </div>
          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">Nombre Comercial</strong>
            </label>
            <input
              type="text"
              name="commercial_name"
              value={input.commercial_name}
              onChange={(e) => handleChange(e)}
              className="form-control"
            />
          </div>
        </>
      )}

      {input.person_type === 'Person' && (
        <>
          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">Nombres cliente</strong>*
            </label>
            <input
              type="text"
              name="name[0]"
              value={input.name[0]}
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
            />
          </div>
          <div
            className="col-md-5 d-flex align-items-center"
            style={{ marginBottom: '20px' }}
          >
            <label className="form-label">
              <strong className="strong_create">Apellidos cliente</strong>*
            </label>
            <input
              type="text"
              name="name[1]"
              value={input.name[1]}
              onChange={(e) => handleChange(e)}
              className="form-control"
              required
            />
          </div>
        </>
      )}
     

      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">Dirección cliente</strong>*
        </label>
        <input
          type="text"
          name="address"
          value={input.address}
          onChange={(e) => handleChange(e)}
          className="form-control"
          required
        />
      </div>
      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">País</strong>*
        </label>
        <select
          name="country_code"
          value={input.country_code}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
          style={{ overflowWrap: 'break-word' }}
          required
        >
          <option value="">Selecciona una opción</option>
          <option value="Co">Co - Colombia</option>
        </select>
      </div>

      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">Departamento</strong>*
        </label>
        <select
          name="state_code"
          value={input.state_code}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
          style={{ overflowWrap: 'break-word' }}
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
        </select>
      </div>

      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">Ciudad/Municipio</strong>*
        </label>
        <select
          name="city_code"
          value={input.city_code}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
          style={{ overflowWrap: 'break-word' }}
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
        </select>
      </div>
      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">Código postal</strong>
        </label>
        <input
          type="text"
          name="postal_code"
          value={input.postal_code}
          onChange={(e) => handleChange(e)}
          className="form-control"
        />
      </div>

     

      <div
        className="col-md-5 d-flex flex-column align-items-start"
        style={{ marginBottom: '20px' }}
      >
        <span className="help-block text-muted small-font">
          <strong className="strong_create">Telefonos cliente</strong>
        </span>{' '}
        {input.phones?.map((phone, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Indicativo 57 para celular"
              value={phone.indicative}
              onChange={(e) =>
                handleChangePhone(index, 'indicative', e.target.value)
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Número"
              value={phone.number}
              onChange={(e) =>
                handleChangePhone(index, 'number', e.target.value)
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Extension"
              value={phone.extension}
              onChange={(e) =>
                handleChangePhone(index, 'extension', e.target.value)
              }
              className="form-control"
            />

            <button
              type="button"
              onClick={() => handleRemovePhone(index)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddPhone}
          className="btn btn-outline-light"
        >
          Agregar Teléfono
        </button>
      </div>

      <div
        className="col-md-5 d-flex flex-column align-items-start"
        style={{ marginBottom: '20px' }}
      >
        <span className="help-block text-muted small-font">
          <strong className="strong_create">Contactos</strong>
        </span>{' '}
        {input.contacts?.map((contact, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Nombre"
              value={contact.first_name}
              onChange={(e) =>
                handleChangeContact(index, 'first_name', e.target.value)
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Apellido"
              value={contact.last_name}
              onChange={(e) =>
                handleChangeContact(index, 'last_name', e.target.value)
              }
              className="form-control"
            />
            <input
              type="email"
              placeholder="Email"
              value={contact.email}
              onChange={(e) =>
                handleChangeContact(index, 'email', e.target.value)
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Indicativo"
              value={contact.phone.indicative}
              onChange={(e) =>
                handleChangeContact(index, 'phone.indicative', e.target.value)
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Teléfono"
              value={contact.phone.number}
              onChange={(e) =>
                handleChangeContact(index, 'phone.number', e.target.value)
              }
              className="form-control"
            />
            <input
              type="text"
              placeholder="Extensión"
              value={contact.phone.extension}
              onChange={(e) =>
                handleChangeContact(index, 'phone.extension', e.target.value)
              }
              className="form-control"
            />
            <button
              type="button"
              onClick={() => handleRemoveContact(index)}
              className="btn btn-danger"
            >
              Eliminar
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={handleAddContact}
          className="btn btn-outline-light"
        >
          Agregar Contacto
        </button>
      </div>

      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">Observaciones</strong>
        </label>
        <textarea
          className="form-control"
          name="comments"
          value={input.comments}
          onChange={(e) => handleChange(e)}
          rows="3"
        ></textarea>
      </div>
      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">
            Vendedor asignado al cliente
          </strong>
        </label>
        <select
          name="seller_id"
          value={input.seller_id}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
        >
          <option value="">Selecciona una opción</option>
          <option value="629">Vendedor 1</option>
          <option value="630">Vendedor 2</option>
          <option value="631">Vendedor 3</option>
        </select>
      </div>
      <div
        className="col-md-5 d-flex align-items-center"
        style={{ marginBottom: '20px' }}
      >
        <label className="form-label">
          <strong className="strong_create">
            Cobrador asignado al cliente
          </strong>
        </label>
        <select
          name="collector_id"
          value={input.collector_id}
          onChange={(e) => handleChange(e)}
          className="form-select form-select-sm"
          aria-label="Small select example"
        >
          <option value="">Selecciona una opción</option>
          <option value="629">Cobrador 1</option>
          <option value="630">Cobrador 2</option>
        </select>
      </div>
    </>
  );
};

export default CreateCustomerInvoice;
